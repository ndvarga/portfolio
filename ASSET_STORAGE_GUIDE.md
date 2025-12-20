# Asset Storage Guide for Portfolio

## Current Setup
Your portfolio uses **Vite** as the build tool. Here's how to handle different types of assets:

## Asset Storage Options

### 1. **Public Folder** (Recommended for Large Static Assets)
- **Location**: `public/` directory
- **Best for**: PDFs, VRML files, large images, videos
- **How it works**: Files are copied as-is to the build output
- **Access**: Use paths like `/portfolio/filename.pdf` (note the leading slash)

**Pros:**
- ✅ No build processing overhead
- ✅ Files are served directly
- ✅ Good for large files
- ✅ Works with external loaders (like Three.js VRMLLoader)

**Cons:**
- ❌ No bundling/optimization
- ❌ No cache busting (unless you manually version filenames)

### 2. **src/assets** (For Images, Small Files)
- **Location**: `src/assets/` directory
- **Best for**: Small images, icons, fonts
- **How it works**: Files are processed by Vite, optimized, and bundled
- **Access**: Import them: `import image from '../assets/image.jpg'`

**Pros:**
- ✅ Automatic optimization
- ✅ Cache busting (hash in filename)
- ✅ Tree-shaking (unused assets removed)
- ✅ TypeScript support

**Cons:**
- ❌ Build-time processing
- ❌ Not ideal for very large files
- ❌ Can't be accessed by external loaders easily

### 3. **Cloud Storage** (For Production/Scale)
- **Services**: AWS S3, Cloudinary, Cloudflare R2, Google Cloud Storage
- **Best for**: Production deployments, CDN delivery, user uploads
- **How it works**: Upload files to cloud, reference via URLs

**Pros:**
- ✅ Fast global delivery (CDN)
- ✅ Scalable
- ✅ Separate from codebase
- ✅ Can optimize/transform on-the-fly (Cloudinary)

**Cons:**
- ❌ Requires setup
- ❌ May have costs
- ❌ More complex deployment

### 4. **Database Storage** (NOT Recommended)
- **Why not**: Databases are for structured data, not binary files
- **Issues**: 
  - ❌ Slows down database queries
  - ❌ Increases database size unnecessarily
  - ❌ Poor performance
  - ❌ Harder to serve files efficiently

**When to use**: Only if you need to store file metadata (name, size, upload date) alongside the file, but store the actual file in cloud storage.

## Recommendations for Your Portfolio

### Current Files:
- **PDFs**: ✅ Already in `public/` - Good!
- **VRML files**: ⚠️ Should move to `public/assets/` for proper loading
- **Images**: ✅ In `src/assets/` - Good for small images

### Suggested Structure:
```
public/
  ├── assets/
  │   ├── models/
  │   │   ├── Tubender PCB.wrl
  │   │   └── Candle_Main_PCB.wrl
  │   └── videos/ (if you add videos later)
  └── *.pdf (keep PDFs here)

src/
  └── assets/
      └── images/ (small images, icons)
```

## Migration Steps

1. **Move VRML files to public:**
   ```bash
   mkdir public/assets/models
   mv src/assets/*.wrl public/assets/models/
   ```

2. **Update component paths:**
   ```tsx
   // Change from:
   url='src/assets/Tubender PCB.wrl'
   // To:
   url='/portfolio/assets/models/Tubender PCB.wrl'
   ```

3. **For production with cloud storage:**
   - Upload large assets to S3/Cloudinary
   - Store URLs in environment variables
   - Update components to use env vars

## When to Use Cloud Storage

Consider cloud storage if:
- Your portfolio gets significant traffic
- Files are very large (>10MB)
- You want global CDN delivery
- You're deploying to a platform with bandwidth limits (like GitHub Pages)

For a personal portfolio, `public/` folder is usually sufficient!

