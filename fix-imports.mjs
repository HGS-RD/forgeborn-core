import fs from 'fs';
import path from 'path';

// Define the files to check
const filesToCheck = [
  'frontend/src/App.tsx',
  'frontend/src/layout/AppShell.tsx',
];

// Correct import paths
const correctPaths = {
  'UserPersonaSidebar': '../nav/UserPersonaSidebar',
  'FloatingAIAssistant': '../components/FloatingAIAssistant',
};

// Get the current directory of the module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

function fixImports() {
  filesToCheck.forEach(filePath => {
    const fullFilePath = path.resolve(__dirname, filePath);

    // Check if file exists
    if (fs.existsSync(fullFilePath)) {
      let content = fs.readFileSync(fullFilePath, 'utf-8');

      // Replace incorrect paths
      Object.keys(correctPaths).forEach(component => {
        const regex = new RegExp(`import ${component} from '.*'`, 'g');
        content = content.replace(regex, `import ${component} from '${correctPaths[component]}'`);
      });

      // Write the fixed content back to the file
      fs.writeFileSync(fullFilePath, content, 'utf-8');
      console.log(`Fixed imports in: ${filePath}`);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  });
}

fixImports();
