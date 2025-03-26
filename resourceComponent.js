import fs from 'fs';
import path from 'path';
import ejs from 'ejs';


const getImportsAndStates = async (resName, operation) => {
    const templatePath = path.join(__dirname, "createGetStates.ejs");
  
    try {
      return await ejs.renderFile(templatePath, { resName, operation });
    } catch (err) {
      console.error("Error rendering importsAndStates.ejs:", err);
      return "";
    }
};

const getOperationsDiv = async ()=>{
  const templatePath = path.join(__dirname, "createOperationsDiv.ejs");
  
  try {
    return await ejs.renderFile(templatePath, { operation });
  } catch (err) {
    console.error("Error rendering createOperationsDiv.ejs:", err);
    return "";
  }
}

const generateResourceComponent = async (resourceName, op, componentPath, operationsDiv) => {
    const importsAndStates = await getImportsAndStates(resourceName, op); // Wait for imports and states
    const operationsDiv = await getOperationsDiv(op);
    ejs.renderFile(
      path.join(__dirname, "resourceComponent.ejs"),
      { resourceName, op, importsAndStates, operationsDiv },
      (err, resourceComponent) => {
        if (err) {
          console.error("Error rendering resourceComponent.ejs:", err);
          return;
        }
        fs.writeFileSync(componentPath, resourceComponent);
        console.log(`Component ${op}${resourceName} created successfully.`);
      }
    );
  };

