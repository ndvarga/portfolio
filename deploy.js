import { execSync } from 'child_process';
import { existsSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { rmSync, mkdirSync } from 'fs';

const distDir = join(process.cwd(), 'dist');
const gitattributesPath = join(process.cwd(), '.gitattributes');
const tempRepo = join(process.cwd(), '.deploy-temp');

console.log('Setting up custom deployment with Git LFS...');

// Clean up any existing temp repo
if (existsSync(tempRepo)) {
  rmSync(tempRepo, { recursive: true, force: true });
}

// Create temp directory and initialize git repo WITHOUT LFS
// (dist contains built assets that should be deployed as-is, not as LFS pointers)
mkdirSync(tempRepo, { recursive: true });

try {
  // Initialize git repo
  execSync('git init', { cwd: tempRepo, stdio: 'inherit' });
  
  // DO NOT initialize LFS - we want to deploy actual files, not LFS pointers
  
  // Copy all files from dist
  console.log('Copying files from dist...');
  const copyRecursive = (src, dest) => {
    try {
      const entries = readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);
        if (entry.isDirectory()) {
          mkdirSync(destPath, { recursive: true });
          copyRecursive(srcPath, destPath);
        } else {
          copyFileSync(srcPath, destPath);
        }
      }
    } catch (err) {
      // Ignore errors for now
    }
  };
  copyRecursive(distDir, tempRepo);
  
  // Add remote
  execSync('git remote add origin https://github.com/ndvarga/portfolio.git', { 
    cwd: tempRepo, 
    stdio: 'inherit' 
  });
  
  // Add all files (without LFS - these are built assets)
  execSync('git add .', { cwd: tempRepo, stdio: 'inherit' });
  
  // Commit
  execSync('git commit -m "Deploy to gh-pages"', { cwd: tempRepo, stdio: 'inherit' });
  
  // Push to gh-pages branch
  console.log('Pushing to gh-pages branch...');
  execSync('git push -f origin HEAD:gh-pages', { cwd: tempRepo, stdio: 'inherit' });
  
  console.log('✓ Deployment complete!');
  
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
} finally {
  // Clean up temp repo
  if (existsSync(tempRepo)) {
    rmSync(tempRepo, { recursive: true, force: true });
  }
}
