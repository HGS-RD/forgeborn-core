/**
 * agents/llmmanager/src/utils/supabase-client.mjs
 * Adapts Supabase client for LangGraph store interface
 */

import { BaseStore, InMemoryStore } from "@langchain/langgraph";
import { supabase } from "../../../../clients/supabase_client.mjs";
import 'dotenv/config';

// Table name for storing LangGraph state 
const DEFAULT_TABLE_NAME = "langgraph_states";
const IN_MEMORY_FALLBACK_WARNING = "⚠️ Supabase credentials missing - falling back to in-memory store";
const STORE_ERROR_PREFIX = "🔴 Supabase Store Error:";

/**
 * LangGraph-compatible Supabase store implementation
 * @class
 * @extends BaseStore
 */
class SupabaseStore extends BaseStore {
  constructor(options = {}) {
    super();
    this.tableName = options.tableName || DEFAULT_TABLE_NAME;
    this.client = supabase;
    this.isConnected = this._validateConnection();
    
    if (!this.isConnected) {
      console.warn(IN_MEMORY_FALLBACK_WARNING);
      this.fallbackStore = new InMemoryStore();
    } else {
      console.info(`✅ Supabase store initialized with table: ${this.tableName}`);
    }
  }

  /**
   * Validates that the Supabase client is properly configured
   * @returns {boolean} Whether the connection is valid
   */
  _validateConnection() {
    // Check if the client exists and has required properties
    if (!this.client || !this.client.from) {
      return false;
    }
    
    // Check if credentials exist in environment
    const hasCredentials = Boolean(
      process.env.SUPABASE_URL && 
      process.env.SUPABASE_ANON_KEY
    );
    
    return hasCredentials;
  }

  /**
   * Get a state by ID
   * @param {string} stateId - The state ID to get
   * @returns {Promise<any>} The state data
   */
  async get(stateId) {
    if (!this.isConnected) {
      return this.fallbackStore.get(stateId);
    }
    
    try {
      const { data, error } = await this.client
        .from(this.tableName)
        .select('state')
        .eq('id', stateId)
        .single();
      
      if (error) {
        console.error(`${STORE_ERROR_PREFIX} Failed to get state ${stateId}`, error);
        throw new Error(`Failed to get state: ${error.message}`);
      }
      
      return data ? data.state : null;
    } catch (error) {
      console.error(`${STORE_ERROR_PREFIX} Exception getting state ${stateId}`, error);
      throw error;
    }
  }

  /**
   * List all state IDs
   * @returns {Promise<string[]>} List of state IDs
   */
  async list() {
    if (!this.isConnected) {
      return this.fallbackStore.list();
    }
    
    try {
      const { data, error } = await this.client
        .from(this.tableName)
        .select('id');
      
      if (error) {
        console.error(`${STORE_ERROR_PREFIX} Failed to list states`, error);
        throw new Error(`Failed to list states: ${error.message}`);
      }
      
      return data.map(item => item.id);
    } catch (error) {
      console.error(`${STORE_ERROR_PREFIX} Exception listing states`, error);
      throw error;
    }
  }

  /**
   * Set a state
   * @param {string} stateId - The state ID
   * @param {any} state - The state to store
   * @returns {Promise<void>}
   */
  async set(stateId, state) {
    if (!this.isConnected) {
      return this.fallbackStore.set(stateId, state);
    }
    
    try {
      const { error } = await this.client
        .from(this.tableName)
        .upsert({ 
          id: stateId, 
          state: state,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'id',
          returning: 'minimal'
        });
      
      if (error) {
        console.error(`${STORE_ERROR_PREFIX} Failed to set state ${stateId}`, error);
        throw new Error(`Failed to set state: ${error.message}`);
      }
    } catch (error) {
      console.error(`${STORE_ERROR_PREFIX} Exception setting state ${stateId}`, error);
      throw error;
    }
  }

  /**
   * Delete a state
   * @param {string} stateId - The state ID to delete
   * @returns {Promise<void>}
   */
  async delete(stateId) {
    if (!this.isConnected) {
      return this.fallbackStore.delete(stateId);
    }
    
    try {
      const { error } = await this.client
        .from(this.tableName)
        .delete()
        .eq('id', stateId);
      
      if (error) {
        console.error(`${STORE_ERROR_PREFIX} Failed to delete state ${stateId}`, error);
        throw new Error(`Failed to delete state: ${error.message}`);
      }
    } catch (error) {
      console.error(`${STORE_ERROR_PREFIX} Exception deleting state ${stateId}`, error);
      throw error;
    }
  }
}

// Pre-configured instance ready to use
export const supabaseStore = new SupabaseStore();

// Also export the class for custom configuration
export { SupabaseStore };
