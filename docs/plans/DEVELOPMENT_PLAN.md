# Vibe - Detailed Development Plan

**Version**: 2.0 (Teacher-First, Zero-Budget Architecture)
**Last Updated**: 2025-11-14
**Status**: Ready for Implementation

---

## Strategic Vision

### Core Philosophy
**Free Forever for Teachers** → Teachers use their own cloud storage → Platform provides zero-cost infrastructure

### Key Principles
1. **Zero Platform Storage Costs** - Teachers use Google Drive/OneDrive/iCloud
2. **Media-First** - Rich media integration is #1 teacher request
3. **Teacher Monetization** - Help teachers earn money, don't extract from them
4. **Progressive Enhancement** - Core features first, advanced features later

---

## Phase 0: Bug Fixes & Stability ✅ COMPLETE

### 0.1 Media Links Bug (FIXED)
**Status**: ✅ Deployed to main
**Commit**: `de8c34f`

**Problem**: Media links (YouTube, external links) added in Lead-In and Presentation were not visible in student view, preview, or print.

**Root Cause**: `leadIn.mediaLinks` and `presentation.mediaLinks` were not initialized in initial lesson state (App.tsx:18-42)

**Fix**: Initialize as empty arrays:
```typescript
leadIn: {
  // ... other fields
  mediaLinks: [], // ✅ ADDED
},
presentation: {
  // ... other fields
  mediaLinks: [], // ✅ ADDED
},
```

**Verified**: Build passes, links now persist correctly across save/load/print.

---

## Phase 1: Media Integration (PRIORITY #1) 🎨

**Timeline**: 6 weeks
**Cost**: $0/month
**Team Size**: 1 developer

### Architecture: Zero-Storage Model

```
┌─────────────────────────────────────────┐
│       Vibe Platform (Firebase)          │
│  - Auth (teacher/student accounts)      │
│  - Firestore (lesson JSON, ~10KB each)  │
│  - URLs only (no file hosting!)         │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
┌───────▼───────┐    ┌───────▼────────┐
│ Unsplash API  │    │ Teacher's Cloud│
│ (stock images)│    │ - Google Drive │
│ 50 req/hour   │    │ - OneDrive     │
│ FREE          │    │ - iCloud       │
└───────────────┘    │ (15GB free)    │
                     └───────▲────────┘
                             │
                     ┌───────┴────────┐
                     │ External Links │
                     │ - YouTube      │
                     │ - SoundCloud   │
                     └────────────────┘
```

---

### Week 1-2: Images (Unsplash + Google Drive)

#### 1.1 Firebase Setup (Day 1-2)
**Goal**: Set up free Firebase project for auth + storage

**Tasks**:
- [ ] Create Firebase project (console.firebase.google.com)
- [ ] Enable Authentication (Email/Google OAuth)
- [ ] Enable Firestore Database (free tier: 1GB, 50k reads/day)
- [ ] Enable Firebase Storage (free tier: 5GB, 1GB/day bandwidth)
- [ ] Add Firebase to Vibe project

**Code**:
```bash
npm install firebase
```

```typescript
// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Environment Variables** (`.env`):
```
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=vibe-xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vibe-xxx
VITE_FIREBASE_STORAGE_BUCKET=vibe-xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Success Criteria**:
- [ ] Firebase project created
- [ ] Can authenticate with email (test account)
- [ ] Can write/read from Firestore
- [ ] `.env` added to `.gitignore`

---

#### 1.2 Unsplash Integration (Day 3-4)
**Goal**: Search and insert professional stock images

**Tasks**:
- [ ] Get Unsplash Access Key (unsplash.com/developers)
- [ ] Create `ImageSearchModal` component
- [ ] Implement search API call
- [ ] Display image grid with thumbnails
- [ ] Insert selected image URL into lesson
- [ ] Add attribution (required by Unsplash terms)

**Code**:
```typescript
// src/services/unsplash.ts
const UNSPLASH_API = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  description: string | null;
}

export async function searchImages(query: string, perPage: number = 12): Promise<UnsplashImage[]> {
  const response = await fetch(
    `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search images');
  }

  const data = await response.json();
  return data.results;
}

export function getAttribution(image: UnsplashImage): string {
  return `Photo by ${image.user.name} on Unsplash`;
}
```

```typescript
// src/components/ImageSearchModal.tsx
import { useState } from 'react';
import { searchImages, UnsplashImage } from '../services/unsplash';

interface Props {
  onSelect: (imageUrl: string, attribution: string) => void;
  onClose: () => void;
}

export default function ImageSearchModal({ onSelect, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchImages(query);
      setImages(results);
    } catch (error) {
      console.error('Image search failed:', error);
      alert('Failed to search images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (image: UnsplashImage) => {
    onSelect(image.urls.regular, getAttribution(image));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Search Images</h2>

        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for images... (e.g., 'restaurant', 'classroom')"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="image-grid">
          {images.map((image) => (
            <div
              key={image.id}
              className="image-card"
              onClick={() => handleSelect(image)}
            >
              <img src={image.urls.small} alt={image.description || 'Unsplash image'} />
              <div className="image-attribution">
                {image.user.name}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}
```

**Success Criteria**:
- [ ] Can search Unsplash images
- [ ] Image grid displays correctly
- [ ] Selected image URL stored in lesson
- [ ] Attribution displayed in student view
- [ ] Respects Unsplash API rate limits (50 req/hour)

---

#### 1.3 Google Drive Integration (Day 5-10)
**Goal**: Teachers upload images to their own Google Drive

**Tasks**:
- [ ] Set up Google Cloud project
- [ ] Enable Google Drive API
- [ ] Create OAuth 2.0 credentials
- [ ] Implement Google Sign-In
- [ ] Implement file upload to Drive
- [ ] Make files publicly accessible
- [ ] Display Drive images in lessons

**Setup (Google Cloud Console)**:
1. Create project: console.cloud.google.com
2. Enable APIs: Drive API, People API
3. Create OAuth credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:5173`, `https://your domain.github.io`
   - Authorized redirect URIs: same as above
4. Get Client ID

**Code**:
```typescript
// src/services/googleDrive.ts
import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let gapiInitialized = false;

export async function initGoogleDrive(): Promise<void> {
  if (gapiInitialized) return;

  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });
        gapiInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function signInToGoogle(): Promise<void> {
  await gapi.auth2.getAuthInstance().signIn();
}

export async function signOutFromGoogle(): Promise<void> {
  await gapi.auth2.getAuthInstance().signOut();
}

export function isSignedIn(): boolean {
  return gapi.auth2?.getAuthInstance()?.isSignedIn?.get() || false;
}

export async function createVibeFolder(): Promise<string> {
  // Check if folder exists
  const response = await gapi.client.drive.files.list({
    q: "name='Vibe Lessons' and mimeType='application/vnd.google-apps.folder' and trashed=false",
    spaces: 'drive',
    fields: 'files(id, name)',
  });

  if (response.result.files && response.result.files.length > 0) {
    return response.result.files[0].id!;
  }

  // Create folder
  const folderMetadata = {
    name: 'Vibe Lessons',
    mimeType: 'application/vnd.google-apps.folder',
  };

  const folder = await gapi.client.drive.files.create({
    resource: folderMetadata,
    fields: 'id',
  });

  return folder.result.id!;
}

export async function uploadImageToDrive(file: File): Promise<string> {
  // Get or create Vibe folder
  const folderId = await createVibeFolder();

  // Upload file
  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: [folderId],
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
      },
      body: form,
    }
  );

  const data = await response.json();
  const fileId = data.id;

  // Make file publicly readable
  await gapi.client.drive.permissions.create({
    fileId: fileId,
    resource: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // Return public URL
  return `https://drive.google.com/uc?id=${fileId}`;
}
```

```typescript
// src/components/ImageUploader.tsx
import { useState } from 'react';
import { uploadImageToDrive, initGoogleDrive, signInToGoogle, isSignedIn } from '../services/googleDrive';

interface Props {
  onUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    initGoogleDrive().then(() => {
      setSignedIn(isSignedIn());
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await signInToGoogle();
      setSignedIn(true);
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Failed to sign in to Google Drive');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImageToDrive(file);
      onUpload(imageUrl);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!signedIn) {
    return (
      <div className="image-uploader">
        <p>Upload images to your Google Drive</p>
        <button onClick={handleSignIn}>
          Connect Google Drive
        </button>
      </div>
    );
  }

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      {uploading && <p>Uploading to your Google Drive...</p>}
    </div>
  );
}
```

**Success Criteria**:
- [ ] Teacher can sign in with Google
- [ ] Image uploads to teacher's Drive
- [ ] "Vibe Lessons" folder created automatically
- [ ] Image URL works in student view
- [ ] Teacher sees storage usage in Drive

---

### Week 3-4: Video + Drawing 🎥 🎨

#### 2.1 YouTube Integration (Day 11-13)
**Goal**: Embed YouTube videos in lessons

**Tasks**:
- [ ] Create `VideoExercise` type in types.ts
- [ ] YouTube URL parser (extract video ID)
- [ ] Video embed component
- [ ] Time range selector (start/end)
- [ ] Questions builder (comprehension)

**Code**:
```typescript
// src/types.ts - ADD THIS
export interface VideoExercise {
  type: 'video';
  id: string;
  title: string;
  instruction: string;
  videoUrl: string; // YouTube URL
  startTime?: number; // seconds
  endTime?: number; // seconds
  questions?: {
    question: string;
    type: 'open' | 'multiple-choice';
    options?: string[]; // for multiple-choice
  }[];
}

// Update Exercise union
export type Exercise =
  | GapFillExercise
  | // ... other types
  | VideoExercise; // ADD THIS
```

```typescript
// src/utils/youtube.ts
export function parseYouTubeURL(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function getYouTubeEmbedURL(videoId: string, startTime?: number, endTime?: number): string {
  let url = `https://www.youtube.com/embed/${videoId}`;

  const params = new URLSearchParams();
  if (startTime) params.append('start', startTime.toString());
  if (endTime) params.append('end', endTime.toString());

  const paramString = params.toString();
  return paramString ? `${url}?${paramString}` : url;
}
```

```typescript
// src/components/VideoPlayer.tsx
import { parseYouTubeURL, getYouTubeEmbedURL } from '../utils/youtube';

interface Props {
  videoUrl: string;
  startTime?: number;
  endTime?: number;
}

export default function VideoPlayer({ videoUrl, startTime, endTime }: Props) {
  const videoId = parseYouTubeURL(videoUrl);

  if (!videoId) {
    return <div className="error">Invalid YouTube URL</div>;
  }

  const embedUrl = getYouTubeEmbedURL(videoId, startTime, endTime);

  return (
    <div className="video-player">
      <iframe
        src={embedUrl}
        width="100%"
        height="400"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

**Success Criteria**:
- [ ] YouTube URLs parsed correctly
- [ ] Video embeds display in builder + student view
- [ ] Start/end times work
- [ ] Comprehension questions displayed below video

---

#### 2.2 Drawing Canvas (Day 14-20)
**Goal**: Teachers draw diagrams, save as image, upload to Drive

**Tasks**:
- [ ] Add `react-canvas-draw` library
- [ ] Create DrawingTool component
- [ ] Color picker, brush size controls
- [ ] Undo/redo functionality
- [ ] Save canvas as PNG
- [ ] Upload to Google Drive
- [ ] Insert into lesson

**Code**:
```bash
npm install react-canvas-draw
```

```typescript
// src/components/DrawingTool.tsx
import { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { uploadImageToDrive } from '../services/googleDrive';

interface Props {
  onSave: (imageUrl: string) => void;
  onClose: () => void;
}

export default function DrawingTool({ onSave, onClose }: Props) {
  const canvasRef = useRef<CanvasDraw>(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(2);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!canvasRef.current) return;

    setSaving(true);
    try {
      // Export canvas as data URL
      const dataURL = canvasRef.current.getDataURL('image/png');

      // Convert to Blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const file = new File([blob], `drawing-${Date.now()}.png`, { type: 'image/png' });

      // Upload to Google Drive
      const imageUrl = await uploadImageToDrive(file);

      onSave(imageUrl);
      alert('Drawing saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save drawing. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="drawing-tool-modal">
      <div className="drawing-canvas">
        <CanvasDraw
          ref={canvasRef}
          brushColor={brushColor}
          brushRadius={brushRadius}
          canvasWidth={800}
          canvasHeight={600}
          lazyRadius={0}
          style={{ border: '1px solid #ccc' }}
        />
      </div>

      <div className="drawing-toolbar">
        <div className="tool-group">
          <label>Color:</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>

        <div className="tool-group">
          <label>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushRadius}
            onChange={(e) => setBrushRadius(Number(e.target.value))}
          />
          <span>{brushRadius}px</span>
        </div>

        <button onClick={() => canvasRef.current?.undo()}>
          Undo
        </button>

        <button onClick={() => canvasRef.current?.clear()}>
          Clear
        </button>

        <button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save to Drive'}
        </button>

        <button onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
```

**Success Criteria**:
- [ ] Can draw with mouse/touch
- [ ] Color picker works
- [ ] Undo/redo works
- [ ] Canvas saves as PNG
- [ ] Uploads to Google Drive
- [ ] Displays in lessons

---

### Week 5-6: Audio + Polish 🎵

#### 3.1 Audio Links (Day 21-23)
**Goal**: Support SoundCloud, YouTube audio, Drive MP3

**Tasks**:
- [ ] Create `AudioExercise` type
- [ ] Audio URL input field
- [ ] Detect source (SoundCloud, YouTube, Drive, generic)
- [ ] Embed player for each source
- [ ] Add transcript field (optional)
- [ ] Add comprehension questions

**Code**:
```typescript
// src/types.ts - ADD THIS
export interface AudioExercise {
  type: 'audio';
  id: string;
  title: string;
  instruction: string;
  audioUrl: string;
  source: 'soundcloud' | 'youtube' | 'drive' | 'other';
  transcript?: string;
  questions?: {
    question: string;
    type: 'open' | 'multiple-choice';
    options?: string[];
  }[];
}

// Update Exercise union
export type Exercise =
  | // ... other types
  | AudioExercise; // ADD THIS
```

```typescript
// src/components/AudioPlayer.tsx
import { parseYouTubeURL } from '../utils/youtube';

interface Props {
  audioUrl: string;
  source: 'soundcloud' | 'youtube' | 'drive' | 'other';
}

export default function AudioPlayer({ audioUrl, source }: Props) {
  if (source === 'soundcloud') {
    return (
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(audioUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
      />
    );
  }

  if (source === 'youtube') {
    const videoId = parseYouTubeURL(audioUrl);
    return (
      <iframe
        width="100%"
        height="60"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ border: 'none' }}
      />
    );
  }

  // Generic audio player for Drive/other MP3 links
  return (
    <audio controls style={{ width: '100%' }}>
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support audio playback.
    </audio>
  );
}
```

**Success Criteria**:
- [ ] SoundCloud embeds work
- [ ] YouTube audio-only works
- [ ] Drive MP3 links play
- [ ] Transcript displays below player
- [ ] Questions work

---

#### 3.2 Polish & Testing (Day 24-30)
**Goal**: Bug fixes, UX improvements, documentation

**Tasks**:
- [ ] Test all media types in both languages (en/uk)
- [ ] Fix any storage/permission issues
- [ ] Add loading states everywhere
- [ ] Improve error messages (bilingual)
- [ ] Add storage usage dashboard
- [ ] Write user documentation (how to use media features)
- [ ] Create sample lessons with media
- [ ] Performance testing (large lessons with many images)

**Deliverables**:
- [ ] All media features work end-to-end
- [ ] Zero crashes/errors
- [ ] docs/guides/MEDIA_INTEGRATION_GUIDE.md
- [ ] 5 sample lessons with rich media

---

## Phase 2: Authentication & User Management 👥

**Timeline**: 5-6 weeks
**Cost**: $0/month (Firebase free tier)

---

## Hybrid Authentication Architecture 🏗️

### Overview

**Chosen Approach**: Hybrid (Google OAuth + Firebase Firestore + Google Drive Storage)

**Why Hybrid?**
1. **Teacher Discovery** - Teachers can find and cooperate with each other
2. **Real Authentication** - Secure, industry-standard OAuth 2.0
3. **Zero Storage Cost** - Lessons stored in teacher's own Google Drive
4. **Community Building** - Public teacher directory enables collaboration
5. **Free Tier Sufficient** - Firebase free plan handles 100+ teachers easily

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Vibe Platform (Web App)                  │
└───────────────┬─────────────────────────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
┌───▼──────────────┐  ┌─────▼──────────────────────┐
│  Firebase Auth   │  │  Firebase Firestore        │
│  (FREE tier)     │  │  (FREE: 1GB, 50k reads/day)│
│                  │  │                            │
│  - Google OAuth  │  │  teachers/{uid}            │
│  - Email/Pass    │  │    - displayName           │
│  - Session mgmt  │  │    - username (unique)     │
│                  │  │    - bio, photo            │
└──────────────────┘  │    - specializations       │
                      │    - publicLessons[]       │
                      │                            │
                      │  students/{uid}            │
                      │    - teacherIds[]          │
                      │    - assignedLessons[]     │
                      │                            │
                      │  lessons/{id}              │
                      │    - JSON metadata (~10KB) │
                      │    - driveFileId           │
                      │    - visibility            │
                      └────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
        ┌───────────▼──────────┐  ┌──────────▼────────────┐
        │ Teacher's Google Drive│  │ Student Access        │
        │ (15GB FREE per user)  │  │                       │
        │                       │  │ - Via public links    │
        │ /Vibe Lessons/        │  │ - OR Drive permissions│
        │   ├─ images/          │  │ - Zero login required │
        │   ├─ audio/           │  │   (for public lessons)│
        │   ├─ drawings/        │  │                       │
        │   └─ lesson-123.json  │  │                       │
        └───────────────────────┘  └───────────────────────┘
```

### Data Storage Strategy

| Data Type | Storage Location | Why | Size | Cost |
|-----------|------------------|-----|------|------|
| **Teacher profile** | Firestore | Searchable, fast queries | ~2KB | FREE |
| **Student profile** | Firestore | Auth, progress tracking | ~1KB | FREE |
| **Lesson metadata** | Firestore | Search, assignment | ~10KB | FREE |
| **Lesson full JSON** | Google Drive | Teacher owns data | ~50KB | FREE |
| **Images** | Google Drive | Teacher storage | 1-5MB | FREE |
| **Audio** | External (SoundCloud) | No storage | 0 | FREE |
| **Video** | External (YouTube) | No storage | 0 | FREE |
| **Drawings** | Google Drive (PNG) | Teacher storage | 100KB-1MB | FREE |
| **Progress data** | Firestore | Real-time tracking | ~5KB | FREE |

**Total Platform Storage**: ~20KB per teacher + ~1KB per student = **NEGLIGIBLE**

**Firebase Free Tier Limits**:
- 1GB storage = ~50,000 teachers (20KB each) ← WAY MORE than we need
- 50,000 reads/day = ~500 active teachers/day ← Sufficient for early stage
- 20,000 writes/day = ~200 teachers creating lessons/day ← More than enough

### Authentication Flow

#### Teacher Registration Flow
```
1. Teacher clicks "Sign Up" → Redirected to Google OAuth
2. Teacher approves Google permissions:
   - View email address
   - View basic profile info
   - Access Google Drive files (scoped to Vibe folder only)
3. Firebase creates auth account (uid, email, displayName, photoURL)
4. App creates Firestore document: teachers/{uid}
5. App creates Google Drive folder: "Vibe Lessons"
6. Teacher completes profile (username, bio, specializations)
7. Profile becomes searchable in teacher directory
```

#### Student Registration Flow (Two Options)

**Option A: No Account Needed** (for public lessons)
```
1. Teacher shares public lesson URL
2. Student opens URL → Sees lesson immediately
3. No login required
4. Progress not tracked
5. Great for: Marketing, free lessons, trial lessons
```

**Option B: With Account** (for assigned lessons)
```
1. Teacher generates invite code in dashboard
2. Teacher shares code with student (email, WhatsApp, etc.)
3. Student clicks "Join as Student" → Enters invite code
4. Student signs in with Google (or email/password)
5. Firebase creates auth account
6. App creates Firestore document: students/{uid}
7. Student auto-linked to teacher
8. Teacher can now assign lessons
9. Progress tracked in Firestore
```

### Teacher Directory Implementation

#### Firestore Schema

```typescript
// teachers/{uid}
{
  // Auth data (from Google OAuth)
  uid: string;                     // Firebase UID
  email: string;                   // teacher@example.com
  displayName: string;             // "Maria Ivanova"
  photoURL: string;                // Google profile photo URL

  // Profile data (teacher-created)
  username: string;                // "maria_ivanova" (unique, validated)
  bio: string;                     // "IELTS specialist with 10 years..."
  specializations: string[];       // ["Business English", "IELTS", "Academic Writing"]
  languages: string[];             // ["English", "Ukrainian"]
  location?: string;               // "Kyiv, Ukraine"

  // Contact info
  contactInfo: {
    method: 'email' | 'whatsapp' | 'telegram' | 'website';
    value: string;                 // "https://t.me/maria_ivanova"
    display: boolean;              // Show on public profile?
  }[];

  // Public lessons (for discovery)
  publicLessons: {
    lessonId: string;              // Firestore lesson doc ID
    driveFileId: string;           // Google Drive file ID
    title: string;
    level: string;                 // A1, B2, etc.
    duration: number;              // minutes
    tags: string[];                // ["grammar", "present-perfect"]
  }[];

  // Stats (for ranking/sorting)
  stats: {
    totalLessons: number;
    publicLessons: number;
    studentsCount: number;
    createdAt: Timestamp;
    lastActive: Timestamp;
  };

  // Visibility
  profileVisibility: 'public' | 'private';  // Hide from directory?
}
```

#### Teacher Discovery Features

**1. Search by Name/Username**
```typescript
// src/services/teacherDirectory.ts
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function searchTeachers(searchTerm: string) {
  const teachersRef = collection(db, 'teachers');

  // Search by username (exact match for now, can add fuzzy search later)
  const q = query(
    teachersRef,
    where('profileVisibility', '==', 'public'),
    where('username', '>=', searchTerm.toLowerCase()),
    where('username', '<=', searchTerm.toLowerCase() + '\uf8ff')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

**2. Filter by Specialization**
```typescript
export async function getTeachersBySpecialization(specialization: string) {
  const teachersRef = collection(db, 'teachers');

  const q = query(
    teachersRef,
    where('profileVisibility', '==', 'public'),
    where('specializations', 'array-contains', specialization)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

**3. Browse All Public Teachers**
```typescript
export async function getAllPublicTeachers(limit: number = 50) {
  const teachersRef = collection(db, 'teachers');

  const q = query(
    teachersRef,
    where('profileVisibility', '==', 'public'),
    orderBy('stats.lastActive', 'desc'),
    limit(limit)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

#### Teacher Directory UI

```typescript
// src/components/TeacherDirectory.tsx
import { useState, useEffect } from 'react';
import { searchTeachers, getTeachersBySpecialization } from '../services/teacherDirectory';
import type { Language } from '../types';

interface Props {
  language: Language;
  onSelectTeacher: (teacherId: string) => void;
}

export default function TeacherDirectory({ language, onSelectTeacher }: Props) {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [loading, setLoading] = useState(false);

  const specializations = [
    'Business English',
    'IELTS',
    'TOEFL',
    'Academic Writing',
    'Conversation',
    'Grammar',
    'Kids English',
    'Medical English',
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchTeachers(searchTerm);
      setTeachers(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterBySpec = async (spec: string) => {
    setSelectedSpec(spec);
    setLoading(true);
    try {
      const results = await getTeachersBySpecialization(spec);
      setTeachers(results);
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-directory">
      <h2>{language === 'en' ? 'Find Teachers' : 'Знайти Вчителів'}</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={language === 'en' ? 'Search by username...' : 'Пошук за іменем користувача...'}
        />
        <button onClick={handleSearch} disabled={loading}>
          {language === 'en' ? 'Search' : 'Шукати'}
        </button>
      </div>

      {/* Specialization Filter */}
      <div className="specialization-filter">
        <label>{language === 'en' ? 'Filter by specialization:' : 'Фільтр за спеціалізацією:'}</label>
        <div className="filter-chips">
          {specializations.map((spec) => (
            <button
              key={spec}
              className={`chip ${selectedSpec === spec ? 'active' : ''}`}
              onClick={() => handleFilterBySpec(spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="teacher-list">
        {loading ? (
          <p>{language === 'en' ? 'Loading...' : 'Завантаження...'}</p>
        ) : (
          teachers.map((teacher) => (
            <div key={teacher.id} className="teacher-card">
              <img src={teacher.photoURL} alt={teacher.displayName} />
              <div className="teacher-info">
                <h3>{teacher.displayName}</h3>
                <p className="username">@{teacher.username}</p>
                <p className="bio">{teacher.bio}</p>
                <div className="specializations">
                  {teacher.specializations.map((spec) => (
                    <span key={spec} className="tag">{spec}</span>
                  ))}
                </div>
                <div className="stats">
                  <span>{teacher.stats.publicLessons} {language === 'en' ? 'public lessons' : 'публічних уроків'}</span>
                  <span>{teacher.stats.studentsCount} {language === 'en' ? 'students' : 'студентів'}</span>
                </div>
                <button onClick={() => onSelectTeacher(teacher.id)}>
                  {language === 'en' ? 'View Profile' : 'Переглянути Профіль'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### Teacher Cooperation Features

#### 1. Share Lessons with Other Teachers

```typescript
// src/services/lessonSharing.ts
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function shareLessonWithTeacher(
  lessonId: string,
  targetTeacherUsername: string
) {
  // Find target teacher by username
  const teachersRef = collection(db, 'teachers');
  const q = query(teachersRef, where('username', '==', targetTeacherUsername));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error('Teacher not found');
  }

  const targetTeacherId = snapshot.docs[0].id;

  // Create share notification
  await addDoc(collection(db, 'notifications'), {
    type: 'lesson_shared',
    recipientId: targetTeacherId,
    lessonId: lessonId,
    timestamp: new Date(),
    read: false,
  });

  return { success: true, teacherId: targetTeacherId };
}
```

#### 2. Duplicate Other Teacher's Public Lesson

```typescript
export async function duplicatePublicLesson(
  originalLessonId: string,
  currentUserId: string
) {
  // Get original lesson from Firestore
  const lessonDoc = await getDoc(doc(db, 'lessons', originalLessonId));

  if (!lessonDoc.exists() || lessonDoc.data().visibility !== 'public') {
    throw new Error('Lesson not available');
  }

  const originalLesson = lessonDoc.data();

  // Create duplicate in current user's Drive
  const duplicated = {
    ...originalLesson,
    id: crypto.randomUUID(),
    createdBy: currentUserId,
    originalAuthor: {
      uid: originalLesson.createdBy,
      displayName: originalLesson.createdByName,
    },
    createdAt: new Date().toISOString(),
  };

  // Save to Firestore and Drive
  const newLessonRef = await addDoc(collection(db, 'lessons'), duplicated);

  return { id: newLessonRef.id, lesson: duplicated };
}
```

#### 3. Follow Other Teachers

```typescript
// teachers/{uid}
{
  // ... existing fields
  following: string[];  // Array of teacher UIDs
  followers: string[];  // Array of teacher UIDs
}

export async function followTeacher(followerId: string, teacherId: string) {
  const followerRef = doc(db, 'teachers', followerId);
  const teacherRef = doc(db, 'teachers', teacherId);

  await updateDoc(followerRef, {
    following: arrayUnion(teacherId)
  });

  await updateDoc(teacherRef, {
    followers: arrayUnion(followerId)
  });
}

export async function getFollowingUpdates(userId: string) {
  const userDoc = await getDoc(doc(db, 'teachers', userId));
  const following = userDoc.data()?.following || [];

  // Get recent public lessons from followed teachers
  const lessonsRef = collection(db, 'lessons');
  const q = query(
    lessonsRef,
    where('createdBy', 'in', following),
    where('visibility', '==', 'public'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### Security Rules (Firestore)

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Teacher profiles
    match /teachers/{teacherId} {
      // Anyone can read public profiles
      allow read: if resource.data.profileVisibility == 'public';

      // Only owner can read private profile
      allow read: if request.auth != null && request.auth.uid == teacherId;

      // Only owner can create/update their profile
      allow create, update: if request.auth != null && request.auth.uid == teacherId;

      // Validate required fields
      allow create, update: if request.resource.data.keys().hasAll([
        'uid', 'email', 'displayName', 'username'
      ]);

      // Username must be unique (validated in app code)
      // Username must be lowercase, alphanumeric + underscore
      allow create, update: if request.resource.data.username.matches('^[a-z0-9_]{3,30}$');
    }

    // Student profiles
    match /students/{studentId} {
      // Students can read their own profile
      allow read: if request.auth != null && request.auth.uid == studentId;

      // Teachers can read their students' profiles
      allow read: if request.auth != null &&
                     resource.data.teacherIds.hasAny([request.auth.uid]);

      // Only owner can create/update
      allow create, update: if request.auth != null && request.auth.uid == studentId;
    }

    // Lessons
    match /lessons/{lessonId} {
      // Anyone can read public lessons
      allow read: if resource.data.visibility == 'public';

      // Teachers can read their own lessons
      allow read: if request.auth != null && resource.data.createdBy == request.auth.uid;

      // Students can read assigned lessons
      allow read: if request.auth != null &&
                     resource.data.assignedTo.hasAny([request.auth.uid]);

      // Only owner can create/update/delete
      allow create, update, delete: if request.auth != null &&
                                        request.resource.data.createdBy == request.auth.uid;
    }
  }
}
```

### Google Drive Permissions

```typescript
// src/services/drivePermissions.ts

// Make lesson file publicly readable (for public lessons)
export async function makeLessonPublic(fileId: string) {
  await gapi.client.drive.permissions.create({
    fileId: fileId,
    resource: {
      role: 'reader',
      type: 'anyone',
    },
  });

  return `https://drive.google.com/uc?id=${fileId}`;
}

// Share lesson with specific student (for private lessons)
export async function shareLessonWithStudent(fileId: string, studentEmail: string) {
  await gapi.client.drive.permissions.create({
    fileId: fileId,
    resource: {
      role: 'reader',
      type: 'user',
      emailAddress: studentEmail,
    },
  });
}

// Share lesson with another teacher (for collaboration)
export async function shareLessonWithTeacher(fileId: string, teacherEmail: string, editable: boolean = false) {
  await gapi.client.drive.permissions.create({
    fileId: fileId,
    resource: {
      role: editable ? 'writer' : 'reader',
      type: 'user',
      emailAddress: teacherEmail,
    },
  });
}
```

### Cost Analysis (Firebase Free Tier)

**Scenario**: 50 teachers, 250 students (5 students per teacher avg)

**Storage**:
- Teachers: 50 × 20KB = 1MB
- Students: 250 × 1KB = 250KB
- Lessons metadata: 500 × 10KB = 5MB
- Progress data: 1,250 records × 5KB = 6.25MB
- **Total**: ~12.5MB / 1GB = **1.25% of quota** ✅

**Reads** (per day):
- Teacher logins: 50 × 2 reads = 100
- Student logins: 250 × 2 reads = 500
- Directory searches: 50 × 5 reads = 250
- Lesson views: 250 × 3 reads = 750
- Progress updates: 250 × 2 reads = 500
- **Total**: ~2,100 / 50,000 = **4.2% of quota** ✅

**Writes** (per day):
- Lesson creation: 10 × 2 writes = 20
- Progress updates: 250 × 2 writes = 500
- Profile updates: 5 × 2 writes = 10
- **Total**: ~530 / 20,000 = **2.65% of quota** ✅

**Bandwidth**:
- All media stored in Google Drive (teacher's quota, not Firebase)
- Only JSON transferred = ~50KB per lesson view
- 250 views/day × 50KB = 12.5MB/day
- **Total**: 12.5MB / 10GB = **0.125% of quota** ✅

**Conclusion**: Firebase free tier can handle **500+ teachers** and **2,500+ students** with zero cost! 🎉

---

### Week 7-8: Teacher Accounts

#### 4.1 Firebase Auth Setup (Day 31-35)
**Goal**: Teachers can register and login

**Tasks**:
- [ ] Enable Email/Password auth in Firebase
- [ ] Enable Google Sign-In
- [ ] Create auth context (React Context API)
- [ ] Login page
- [ ] Registration page
- [ ] Password reset flow
- [ ] Email verification (optional)

**Code**:
```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

**Success Criteria**:
- [ ] Teachers can register with email/password
- [ ] Teachers can sign in with Google
- [ ] Password reset works
- [ ] Auth state persists across page refreshes

---

#### 4.2 Teacher Profiles (Day 36-42)
**Goal**: Teachers create public profiles

**Tasks**:
- [ ] Create `teachers` collection in Firestore
- [ ] Profile creation form
- [ ] Profile display page
- [ ] Public profile URL (vibe.com/teacher/username)
- [ ] Bio, photo, specializations, contact info
- [ ] Link to public lessons

**Firestore Schema**:
```typescript
// teachers/{uid}
{
  uid: string;
  email: string;
  displayName: string;
  username: string; // unique
  photoURL: string;
  bio: string;
  specializations: string[]; // ['Business English', 'IELTS', 'Kids']
  languages: string[]; // ['English', 'Ukrainian']
  contactInfo: {
    method: 'email' | 'whatsapp' | 'telegram' | 'website';
    value: string;
  };
  publicLessons: string[]; // lesson IDs
  createdAt: Timestamp;
}
```

**Success Criteria**:
- [ ] Teacher can create/edit profile
- [ ] Public profile page loads
- [ ] Username is unique
- [ ] Profile photo uploads to Firebase Storage

---

### Week 9-10: Student Accounts

#### 5.1 Student Registration (Day 43-49)
**Goal**: Students register with teacher-provided code

**Tasks**:
- [ ] Create `students` collection
- [ ] Invite code generation (by teacher)
- [ ] Student registration with invite code
- [ ] Auto-link student to teacher
- [ ] Student dashboard

**Firestore Schema**:
```typescript
// students/{uid}
{
  uid: string;
  email: string;
  displayName: string;
  teacherIds: string[]; // can have multiple teachers
  assignedLessons: {
    lessonId: string;
    teacherId: string;
    assignedAt: Timestamp;
    dueDate?: Timestamp;
    completed: boolean;
  }[];
  createdAt: Timestamp;
}

// inviteCodes/{code}
{
  code: string; // random 8-char code
  teacherId: string;
  expiresAt: Timestamp;
  used: boolean;
  studentId?: string; // set when used
}
```

**Success Criteria**:
- [ ] Teacher generates invite codes
- [ ] Student registers with code
- [ ] Student auto-linked to teacher
- [ ] Student sees "My Teachers" list

---

#### 5.2 Lesson Assignment (Day 50-56)
**Goal**: Teachers assign lessons to students

**Tasks**:
- [ ] Teacher "Assign Lesson" UI
- [ ] Select students (checkboxes)
- [ ] Set due date (optional)
- [ ] Send notification (email? in-app?)
- [ ] Student sees assigned lessons
- [ ] Mark lesson as complete

**Success Criteria**:
- [ ] Teacher can assign lessons
- [ ] Students see assignments
- [ ] Due dates work
- [ ] Completion tracking works

---

### Week 11-12: Progress Tracking

#### 6.1 Student Progress (Day 57-63)
**Goal**: Track which exercises students complete

**Tasks**:
- [ ] Create `lessonProgress` collection
- [ ] Track exercise completion
- [ ] Track time spent
- [ ] Track scores (for objective exercises)
- [ ] Teacher dashboard showing progress

**Firestore Schema**:
```typescript
// lessonProgress/{studentId}_{lessonId}
{
  studentId: string;
  lessonId: string;
  teacherId: string;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  exercises: {
    exerciseId: string;
    completed: boolean;
    attempts: number;
    score?: number;
    timeSpent: number; // seconds
  }[];
  totalTimeSpent: number;
}
```

**Success Criteria**:
- [ ] Progress tracked in real-time
- [ ] Teacher sees completion stats
- [ ] Student sees their progress

---

## Phase 3: Assessment Tools 📊

**Timeline**: 5-6 weeks
**Cost**: $0/month
**Priority**: Medium

### Week 13-14: Rubrics

#### 7.1 Rubric Builder (Day 64-70)
**Goal**: Teachers create grading rubrics

**Tasks**:
- [ ] Rubric data structure
- [ ] Rubric builder UI (criteria, levels, descriptors)
- [ ] Attach rubric to exercise
- [ ] Print rubric
- [ ] Digital grading interface (future)

**Success Criteria**:
- [ ] Teachers can create rubrics
- [ ] Rubrics print nicely
- [ ] Can attach to speaking/writing exercises

---

### Week 15-16: Self-Assessment

#### 8.1 Can-Do Statements (Day 71-77)
**Goal**: Students self-assess with CEFR can-do statements

**Tasks**:
- [ ] Add can-do statements library (CEFR)
- [ ] Student rates confidence (1-5)
- [ ] Track progress over time
- [ ] Teacher sees student self-assessments

**Success Criteria**:
- [ ] Students can self-assess
- [ ] Progress tracked over time
- [ ] Teacher dashboard shows insights

---

### Week 17-18: Analytics

#### 9.1 Lesson Analytics (Day 78-84)
**Goal**: Teachers see what's working

**Tasks**:
- [ ] Lesson completion rate
- [ ] Time spent per exercise
- [ ] Common wrong answers (multiple choice)
- [ ] Difficulty analysis (too easy/hard)
- [ ] Recommendations ("Exercise 3 needs simplification")

**Success Criteria**:
- [ ] Teacher dashboard with charts
- [ ] Actionable insights
- [ ] Export analytics as CSV

---

## Phase 4: LMS Integration (Optional) 🔗

**Timeline**: 4-5 weeks
**Cost**: $0/month
**Priority**: Low (Only if teachers request)

### Week 19-21: Canvas Integration

#### 10.1 Canvas LTI (Day 85-98)
**Goal**: Sync grades with Canvas

**Tasks**:
- [ ] Set up Canvas developer account
- [ ] Implement LTI 1.3 protocol
- [ ] OAuth with Canvas
- [ ] Create assignment in Canvas
- [ ] Send grades back to Canvas
- [ ] Test with real Canvas instance

**Success Criteria**:
- [ ] Assignment created in Canvas
- [ ] Grades sync automatically
- [ ] Works with major universities

---

### Week 22: Google Classroom

#### 11.1 Google Classroom API (Day 99-105)
**Goal**: Integrate with Google Classroom

**Tasks**:
- [ ] Enable Classroom API
- [ ] Create assignment
- [ ] Grade sync
- [ ] Test with real Classroom

---

## Phase 5: AI Features (POSTPONED - When Budget Exists) 🤖

**Timeline**: TBD
**Cost**: $500-2000/month (API costs)
**Priority**: LOW

### Approach: Teacher Brings Own API Key

Instead of platform paying for AI:
1. Teacher gets own OpenAI/Anthropic API key
2. Platform provides prompt templates
3. Teacher's API key used for generation
4. Zero cost to platform

**Features** (when implemented):
- Lesson generator
- Exercise generator
- Example sentence generator
- Prompt template library
- Custom prompt playground

---

## Deployment Strategy

### Development Environment
```bash
# Local development
npm run dev  # localhost:5173

# Preview production build
npm run build
npm run preview
```

### Staging (dev branch)
- Auto-deploy to: vibe-dev.github.io (or dev.yourdomain.com)
- For testing with 5 initial teachers
- Can break things, it's okay

### Production (main branch)
- Auto-deploy to: krisztiankoos.github.io/vibe
- Only merge tested features
- Always run `npm run build` before merging
- Always test in both languages

---

## Success Metrics

### Phase 1 (Media Integration)
- [ ] 5 teachers using media features
- [ ] Average 3+ images per lesson
- [ ] Average 1+ video per lesson
- [ ] Zero storage costs to platform
- [ ] Teachers happy with UX (survey)

### Phase 2 (Auth & Users)
- [ ] 10 teachers registered
- [ ] 50 students registered
- [ ] Average 5 students per teacher
- [ ] 80%+ lessons have public profiles

### Phase 3 (Assessment)
- [ ] 50%+ teachers use rubrics
- [ ] Students self-assess weekly
- [ ] Teachers use analytics dashboard

---

## Risk Mitigation

### Risk 1: Firebase Free Tier Exceeded
**Likelihood**: Low (for 5-50 teachers)
**Impact**: High (costs money)
**Mitigation**:
- Monitor usage weekly
- Set up Firebase budget alerts
- If exceeded: Ask teachers to upgrade ($25/month Blaze plan, usage-based)

### Risk 2: Google Drive Permission Issues
**Likelihood**: Medium (user error)
**Impact**: Medium (images don't load)
**Mitigation**:
- Clear documentation
- Auto-check permissions
- Fallback to Unsplash if Drive fails

### Risk 3: Teachers Don't Understand Cloud Storage
**Likelihood**: Medium
**Impact**: Medium (confusion)
**Mitigation**:
- Video tutorials
- In-app onboarding wizard
- Help button with FAQs

---

## Open Questions

1. **Storage**: Google Drive only, or also OneDrive/iCloud?
   - **Recommendation**: Start with Google Drive only (simpler), add others if requested

2. **Student Accounts**: Required or optional?
   - **Recommendation**: Optional for now. Public lessons don't need accounts.

3. **Pricing**: Free forever, or freemium after Phase 2?
   - **Recommendation**: Free while < 100 teachers, then introduce optional premium ($5/month)

4. **LMS**: Build Canvas integration preemptively, or wait for demand?
   - **Recommendation**: Wait. Only 20-30% of teachers use LMS.

5. **Mobile**: When to build mobile app?
   - **Recommendation**: Phase 6+. Web-first, responsive design sufficient for now.

---

## Timeline Summary

| Phase | Duration | Cost | Priority |
|-------|----------|------|----------|
| Phase 0: Bugfixes | ✅ Done | $0 | CRITICAL |
| Phase 1: Media | 6 weeks | $0 | HIGH |
| Phase 2: Auth/Users | 6 weeks | $0 | HIGH |
| Phase 3: Assessment | 6 weeks | $0 | MEDIUM |
| Phase 4: LMS | 5 weeks | $0 | LOW |
| Phase 5: AI | TBD | $500-2k/mo | LOW |

**Total MVP** (Phases 1-2): 12 weeks = ~3 months

---

## Next Steps (This Week)

### Immediate Actions
1. ✅ Fix mediaLinks bug (DONE - deployed to main)
2. [ ] Set up Firebase project
3. [ ] Get Unsplash API key
4. [ ] Set up Google Cloud project for Drive API
5. [ ] Create development roadmap board (GitHub Projects)

### Week 1 Goals
- [ ] Firebase integrated
- [ ] Unsplash image search working
- [ ] Google Drive auth working

---

**Last Updated**: 2025-11-14
**Version**: 1.0 (Initial Plan)
**Status**: ✅ Ready to start Phase 1
