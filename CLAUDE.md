# English Phonics - Kids Learning App

## Tech Stack
- React 18 + TypeScript + Vite (port 3000)
- Tailwind CSS 3 (HSL color system, custom classes in src/index.css)
- React Router DOM v6 (client-side routing)
- Lucide React (icons)
- PWA (vite-plugin-pwa, service worker with CacheFirst for audio/images)
- GitHub Pages deployment (base: `/english-phonics/`)

## Commands
- `npm run dev` - dev server (localhost:3000)
- `npm run build` - tsc + vite build
- `npm run lint` - eslint

## Project Structure
```
src/
  App.tsx              # BrowserRouter + AppProvider wrapper
  routes.tsx           # All route definitions
  types.ts             # TypeScript interfaces (AlphabetData, VocabularyWord, etc.)
  main.tsx             # Entry point
  index.css            # Tailwind + custom CSS (animations, HSL colors)
  context/
    AppContext.tsx      # Global state (user, category, vocabularyCategory) via useReducer
  components/
    NicknameInput.tsx   # / - nickname input screen
    CategorySelection.tsx # /select-category - choose alphabet/vocabulary/conversation
    AlphabetCards.tsx    # /alphabet-cards - A~Z card grid (emoji + letter)
    AlphabetLearning.tsx # /alphabet - pronunciation learning (accepts startIndex via location.state)
    VocabularyCategories.tsx # /vocabulary-categories - vocab sub-category selection
    VocabularyWordCards.tsx  # /vocabulary/:category/cards - word card grid per category
    VocabularyLearning.tsx  # /vocabulary/:category - vocab flashcard learning (accepts startIndex)
    ConversationCards.tsx # /conversation-cards - conversation topic card grid
    ConversationLearning.tsx # /conversation - conversation learning (accepts startSetIndex)
    AudioIndicator.tsx  # Playback state visual indicator
    AudioGesturePrompt.tsx # Browser audio autoplay permission prompt
    UserProfile.tsx     # User profile display
    LoadingSpinner.tsx  # Loading spinner
    ErrorMessage.tsx    # Error display
  hooks/
    useAudioPlayer.ts   # Audio playback hook (play, stop, repeat N times)
  utils/
    data.ts             # Data loaders (loadAlphabets, loadVocabulary, loadConversations)
    audio.ts            # Audio utility functions
    storage.ts          # localStorage for user profile
    shuffle.ts          # Array shuffle utility
  data/
    alphabets.json      # A-Z alphabet data (letter, emoji, exampleWord, audioFile)
    vocabulary.json     # Vocabulary by category (food, cooking, animals, vehicles, body-parts)
    conversations.json  # Conversation sets with sentences
```

## Route Flow
```
/ (NicknameInput)
  -> /select-category (CategorySelection)
       -> /alphabet-cards (AlphabetCards) -> /alphabet (AlphabetLearning)
       -> /vocabulary-categories -> /vocabulary/:category/cards (VocabularyWordCards) -> /vocabulary/:category (VocabularyLearning)
       -> /conversation-cards (ConversationCards) -> /conversation (ConversationLearning)
```

## Key Patterns
- Data files in `src/data/*.json`, loaded via `src/utils/data.ts` with `assetUrl()` for base path
- Audio files at `public/assets/audio/`, images at `public/assets/images/`
- Navigation state passing: `navigate('/alphabet', { state: { startIndex } })`
- Tailwind custom colors: `bg-cat-blue`, `bg-cat-green`, `bg-cat-orange`
- Animations: `animate-bounce-in`, `animate-float`, `animate-star-burst`
- All UI text is in Korean
