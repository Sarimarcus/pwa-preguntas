# PWA Preguntas - MVP Development Tasks

## Phase 1: Project Setup & Foundation

### Task 1: Initialize Next.js Project

- **Goal**: Create the basic Next.js project structure with Tailwind CSS and App Router
- **Actions**:
  - Run `npx create-next-app@latest . --app=true --tailwind=true --eslint=false --typescript=true`
  - Verify package.json is created with Next.js dependencies and Tailwind CSS
  - Confirm tailwind.config.js and postcss.config.js are created
  - Verify app/ directory structure with layout.tsx and page.tsx
- **Test**: Run `npm run dev` and confirm Next.js starts without errors
- **Files**: package.json, next.config.js, app/layout.tsx, app/page.tsx, tailwind.config.js, postcss.config.js

### Task 2: Create Next.js Configuration

- **Goal**: Set up basic Next.js configuration for PWA
- **Actions**:
  - Create/modify `next.config.js` with basic configuration
  - Add any necessary settings for static export if needed
- **Test**: Project builds successfully with `npm run build`
- **Files**: next.config.js

### Task 3: Create Global CSS Structure

- **Goal**: Set up the global styles foundation with Tailwind CSS
- **Actions**:
  - Verify `app/globals.css` exists with Tailwind directives (@tailwind base, components, utilities)
  - Add any custom CSS variables or base styles needed for the app
  - Confirm globals.css is imported in `app/layout.tsx`
- **Test**: Tailwind classes work when applied to elements in the dev server
- **Files**: app/globals.css, app/layout.tsx

## Phase 2: Data Layer

### Task 4: Create Questions Data File

- **Goal**: Create the JSON file with sample questions
- **Actions**:
  - Create `public/` directory if not exists
  - Create `public/questions.json` with 5-10 sample questions
  - Each question should have: id, question, options (array), correctAnswer (index)
- **Test**: File loads correctly when accessed via `/questions.json` in browser
- **Files**: public/questions.json

### Task 5: Create Random Question Utility

- **Goal**: Build utility to select random questions
- **Actions**:
  - Create `lib/` directory (modern App Router convention)
  - Create `lib/getRandomQuestion.ts` with function to fetch and return random question
  - Function should handle loading JSON and selecting random item
- **Test**: Function returns a valid question object when called
- **Files**: lib/getRandomQuestion.ts

## Phase 3: Core Components

### Task 6: Create Question Form Component Structure

- **Goal**: Build the basic question display component
- **Actions**:
  - Create `components/` directory
  - Create `components/QuestionForm.tsx` with basic structure
  - Component should accept question prop and display question text
  - No answer logic yet, just display
- **Test**: Component renders question text when passed a question object
- **Files**: components/QuestionForm.tsx

### Task 7: Add Answer Options to Question Form

- **Goal**: Display multiple choice options in Question Form
- **Actions**:
  - Extend `QuestionForm.tsx` to display answer options as buttons
  - Use Tailwind classes for basic button styling (bg-blue-500, hover:bg-blue-600, text-white, etc.)
  - No click handlers yet, just visual display
- **Test**: All answer options render as styled buttons
- **Files**: components/QuestionForm.tsx

### Task 8: Add Answer Selection Logic

- **Goal**: Handle user answer selection in Question Form
- **Actions**:
  - Add state to track selected answer
  - Add click handlers to option buttons
  - Add visual feedback for selected option using Tailwind classes (bg-blue-600, ring-2, ring-blue-300)
  - Add submit button with Tailwind styling (disabled until option selected)
- **Test**: User can select an option and submit button becomes enabled with proper visual feedback
- **Files**: components/QuestionForm.tsx

### Task 9: Add Answer Validation Logic

- **Goal**: Check if selected answer is correct
- **Actions**:
  - Add prop for onAnswerSubmit callback
  - Compare selected answer with correct answer
  - Call callback with result (correct/incorrect)
- **Test**: Callback is called with correct boolean when answer is submitted
- **Files**: components/QuestionForm.tsx

## Phase 4: Result Pages

### Task 10: Create Win Page Component

- **Goal**: Build the success/win page
- **Actions**:
  - Create `components/WinPage.tsx`
  - Add congratulations message with Tailwind styling (text-center, text-green-600, text-4xl, etc.)
  - Add "Play Again" button with onClick prop and Tailwind classes (bg-green-500, hover:bg-green-600)
- **Test**: Component renders win message and play again button with proper styling
- **Files**: components/WinPage.tsx

### Task 11: Create Lost Page Component

- **Goal**: Build the failure/lost page
- **Actions**:
  - Create `components/LostPage.tsx`
  - Add "better luck next time" message with Tailwind styling (text-center, text-red-600, text-4xl, etc.)
  - Add "Try Again" button with onClick prop and Tailwind classes (bg-red-500, hover:bg-red-600)
  - Optionally show correct answer with appropriate styling
- **Test**: Component renders lost message and try again button with proper styling
- **Files**: components/LostPage.tsx

## Phase 5: Main Application Logic

### Task 12: Integrate Components in Main Page

- **Goal**: Connect all components in the main app page
- **Actions**:
  - Modify `app/page.tsx` to use QuestionForm component
  - Add state management for current question
  - Load initial question using getRandomQuestion utility
- **Test**: Main page loads and displays a question
- **Files**: app/page.tsx

### Task 13: Add Game State Management

- **Goal**: Handle game flow between question, win, and lost states
- **Actions**:
  - Add state for game status (playing, won, lost)
  - Add logic to switch between QuestionForm, WinPage, LostPage
  - Handle answer submission results
- **Test**: Correct answers show win page, incorrect show lost page
- **Files**: app/page.tsx

### Task 14: Add Reset/Replay Functionality

- **Goal**: Allow users to start new questions
- **Actions**:
  - Add function to load new random question
  - Connect play again buttons to reset function
  - Reset game state to playing mode
- **Test**: Play again buttons load new questions and reset game state
- **Files**: app/page.tsx

## Phase 6: PWA Configuration

### Task 15: Create PWA Manifest

- **Goal**: Make the app installable as PWA
- **Actions**:
  - Create `public/manifest.json` with app metadata
  - Include app name, description, icons, theme colors
  - Add basic 192x192 and 512x512 icon placeholders
- **Test**: Manifest loads correctly and shows install prompt in supported browsers
- **Files**: public/manifest.json

### Task 16: Add Manifest to HTML Head

- **Goal**: Link the PWA manifest to the application
- **Actions**:
  - Modify `app/layout.tsx` to include manifest link in metadata
  - Add any necessary meta tags for PWA in the metadata export
- **Test**: Browser recognizes app as PWA and shows install option
- **Files**: app/layout.tsx

### Task 17: Add Basic Service Worker (Optional)

- **Goal**: Enable offline functionality
- **Actions**:
  - Add basic service worker registration
  - Cache essential files for offline use
- **Test**: App works offline after initial load
- **Files**: public/sw.js, app/layout.tsx

## Phase 7: Styling & Polish

### Task 18: Enhance Question Form Component Styling

- **Goal**: Make the question form visually appealing with advanced Tailwind features
- **Actions**:
  - Enhance QuestionForm.tsx with advanced Tailwind classes for better UX
  - Add animations and transitions (transition-all, duration-200, hover:scale-105)
  - Implement card-like design with shadows (shadow-lg, rounded-lg)
  - Add focus states and accessibility improvements
- **Test**: Question form looks polished with smooth animations and great UX
- **Files**: components/QuestionForm.tsx

### Task 19: Enhance Result Pages Styling

- **Goal**: Make win/lost pages visually appealing with consistent design
- **Actions**:
  - Enhance WinPage.tsx and LostPage.tsx with advanced Tailwind styling
  - Add animations for celebration/consolation (animate-bounce, animate-pulse)
  - Use consistent design language with question form (same card style, spacing)
  - Add icons or emojis with proper sizing and spacing
- **Test**: Result pages look polished and provide clear emotional feedback
- **Files**: components/WinPage.tsx, components/LostPage.tsx

### Task 20: Add Responsive Design and Layout

- **Goal**: Ensure app works perfectly on all devices
- **Actions**:
  - Add responsive container classes (container, mx-auto, px-4)
  - Implement responsive text sizing (text-sm sm:text-base lg:text-lg)
  - Add responsive spacing and layout adjustments
  - Ensure touch targets are appropriately sized (min-h-12, min-w-12)
  - Test on various screen sizes using Tailwind's responsive prefixes
- **Test**: App works beautifully on mobile devices and desktop
- **Files**: All component files, styles/globals.css

## Phase 8: Final Testing & Deployment

### Task 21: Add More Question Content

- **Goal**: Expand the question database
- **Actions**:
  - Add 20-50 questions to questions.json
  - Ensure variety in topics and difficulty
  - Validate JSON structure
- **Test**: Random questions work correctly with larger dataset
- **Files**: public/questions.json

### Task 22: Test Complete User Flow

- **Goal**: Verify entire application works end-to-end
- **Actions**:
  - Test question loading, answering, win/loss flows
  - Test PWA installation and offline functionality
  - Test on multiple devices and browsers
- **Test**: Complete user journey works without errors
- **Files**: All files

### Task 23: Build and Deploy Preparation

- **Goal**: Prepare app for production deployment
- **Actions**:
  - Run production build with `npm run build`
  - Test production build locally
  - Verify all assets load correctly
- **Test**: Production build works identically to development
- **Files**: Build output

---

## Notes for Implementation:

- Each task should be completed and tested before moving to the next
- Focus on making each component work in isolation first
- Use Tailwind CSS utility classes for all styling - avoid custom CSS unless absolutely necessary
- Leverage Tailwind's responsive design features (sm:, md:, lg:, xl: prefixes)
- Use Tailwind's color palette consistently throughout the app
- Test on both desktop and mobile after styling tasks
- Validate JSON files before implementing dependent features
- Take advantage of Tailwind's built-in animations and transitions for better UX
