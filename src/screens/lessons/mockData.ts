export interface LessonComponent {
  videoUrl?: string;
  duration?: string;
  chapters?: { time: string; title: string }[];
  documentText?: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  flashcards?: { front: string; back: string }[];
}

export interface DetailedLesson {
  id: string;
  courseId: string;
  index: number;
  title: string;
  description: string;
  type: 'video' | 'document' | 'interactive';
  duration: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Not Started' | 'In Progress' | 'Completed';
  objectives: string[];
  requirements: string[];
  components: LessonComponent;
  points: number;
}

export let MOCK_LESSONS: DetailedLesson[] = [
  // React Native Layouts & Flexbox (mc1)
  {
    id: 'l1',
    courseId: 'mc1',
    index: 1,
    title: 'Introduction to Flexbox Layouts',
    description: 'Learn the foundational principles of layout alignment using Flexbox in React Native. Master main axis and cross-axis alignment strategies for robust layouts.',
    type: 'video',
    duration: '12 min',
    estimatedTime: '15 mins',
    difficulty: 'Beginner',
    status: 'In Progress',
    points: 150,
    objectives: [
      'Understand the difference between main-axis and cross-axis',
      'Deploy justifyContent properties correctly to distribute spacing',
      'Explain how flexGrow and flexShrink partition available container dimensions'
    ],
    requirements: [
      'Basic understanding of JSX structure',
      'Audio device active for video player instructions',
      'Workspace editor initialized'
    ],
    components: {
      videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
      duration: '12:45',
      chapters: [
        { time: '00:00', title: 'Welcome & Introduction' },
        { time: '02:15', title: 'Main Axis vs Cross Axis' },
        { time: '05:40', title: 'JustifyContent Demo' },
        { time: '09:10', title: 'AlignItems Adjustments' },
        { time: '11:55', title: 'Wrap Up & Assessment' }
      ]
    }
  },
  {
    id: 'l2',
    courseId: 'mc1',
    index: 2,
    title: 'Flex Direction & Wrap Modes',
    description: 'Deep dive into row and column orientations. Learn to utilize flexWrap to build responsive fluid grid layouts that seamlessly adjust across tablets and phone screens.',
    type: 'document',
    duration: '18 min',
    estimatedTime: '20 mins',
    difficulty: 'Intermediate',
    status: 'Not Started',
    points: 200,
    objectives: [
      'Implement column-reverse and row-reverse flex layouts',
      'Solve off-screen clipping problems using flexWrap properties',
      'Design grid-aligned card matrices without hardcoded absolute sizing'
    ],
    requirements: [
      'Completion of Flexbox Layouts 101',
      'Knowledge of device viewport proportions'
    ],
    components: {
      documentText: `# Flex Direction & Wrap Modes in React Native

By default, React Native flex containers set their \`flexDirection\` to \`column\`. This differs from web CSS where the default is \`row\`. 

## 1. Direction Orientations
- **column**: Items stack vertically. Main axis is vertical, cross axis is horizontal.
- **row**: Items align horizontally. Main axis is horizontal, cross axis is vertical.
- **column-reverse**: Stacks items starting from bottom to top.
- **row-reverse**: Aligns items starting from right to left.

## 2. Flex Wrapping
Without wrapping, items will try to shrink to fit inside one single screen line. This leads to text overflows or squished shapes.
By defining \`flexWrap: 'wrap'\`, items that exceed the main-axis width will wrap onto consecutive lines automatically.

\`\`\`tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '30%',
    margin: '1.5%',
  }
});
\`\`\`

## 3. Best Practices
Always leverage relative widths (percentages or flex-proportions) rather than hardcoded width values. Test your screens in landscape orientations and smaller smartphone sizes.`
    }
  },
  {
    id: 'l3',
    courseId: 'mc1',
    index: 3,
    title: 'Margin Auto & AlignSelf Practice',
    description: 'Test your understanding of alignments, margin auto spacing, and override methods through flashcards and quiz review.',
    type: 'interactive',
    duration: '15 min',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    status: 'Not Started',
    points: 250,
    objectives: [
      'Recall default React Native styling overrides',
      'Identify layout mistakes from React code snippets',
      'Apply alignment concepts in a care-simulation workflow'
    ],
    requirements: [
      'Read through Flex Direction guidelines'
    ],
    components: {
      flashcards: [
        { front: 'What is the default flexDirection in React Native?', back: "The default flexDirection is 'column'." },
        { front: 'What is the purpose of flexWrap: wrap?', back: 'It allows items to wrap onto multiple lines if they exceed the main axis length.' },
        { front: 'How does alignSelf differ from alignItems?', back: 'alignItems sets alignment for all children; alignSelf overrides it for a single specific child element.' }
      ],
      quiz: [
        {
          question: 'If flexDirection is set to "row", which property aligns children along the horizontal axis?',
          options: ['alignItems', 'justifyContent', 'alignSelf', 'flexWrap'],
          correctIndex: 1,
          explanation: 'When flexDirection is "row", the horizontal axis is the main axis. justifyContent controls spacing along the main axis.'
        },
        {
          question: 'Which style causes a child to fill all remaining available space inside a parent container?',
          options: ['flex: 1', 'alignItems: "stretch"', 'width: "100%"', 'position: "absolute"'],
          correctIndex: 0,
          explanation: 'Setting flex: 1 tells the component to grow and fill the remaining free space inside its parent.'
        }
      ]
    }
  },

  // Redux State Management Architecture (mc2)
  {
    id: 'l4',
    courseId: 'mc2',
    index: 1,
    title: 'Redux Store Architectures',
    description: 'Understand the concept of single source of truth, reducers, actions, and store configuration using modern Redux Toolkit.',
    type: 'video',
    duration: '20 min',
    estimatedTime: '18 mins',
    difficulty: 'Beginner',
    status: 'Completed',
    points: 150,
    objectives: [
      'Configure a Redux store using configureStore',
      'Write slices with state, reducers, and action creators',
      'Connect components using useSelector and useDispatch'
    ],
    requirements: [
      'Knowledge of basic state management hooks',
      'Audio enabled'
    ],
    components: {
      videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
      duration: '15:10',
      chapters: [
        { time: '00:00', title: 'Redux Core Philosophy' },
        { time: '03:40', title: 'Why Redux Toolkit?' },
        { time: '07:15', title: 'Building a Store Slice' },
        { time: '12:00', title: 'Connecting Components' }
      ]
    }
  },
  {
    id: 'l5',
    courseId: 'mc2',
    index: 2,
    title: 'Saga Generator Functions',
    description: 'Master side effect handling in Redux with redux-saga. Understand generator functions (*), yield, and async actions routing.',
    type: 'document',
    duration: '25 min',
    estimatedTime: '25 mins',
    difficulty: 'Advanced',
    status: 'Not Started',
    points: 300,
    objectives: [
      'Write ES6 generator functions for async operations',
      'Deploy takeEvery and takeLatest event listeners',
      'Yield call and put actions inside saga workflows'
    ],
    requirements: [
      'Understanding of promises and async programming'
    ],
    components: {
      documentText: `# Saga Generator Functions in Redux

Redux-Saga is a middleware library designed to make application side effects (e.g. data fetching, browser caching) easier to manage.

## 1. Generator Functions
Sagas are written using **generator functions** (\`function*\`). Generators can pause execution using the \`yield\` keyword.

\`\`\`javascript
function* mySaga() {
  const data = yield call(fetchApiData);
  yield put({ type: 'DATA_RECEIVED', payload: data });
}
\`\`\`

## 2. Common Saga Helpers
- **takeEvery**: Starts a new saga task on every dispatched action.
- **takeLatest**: Cancels any previously running instance of the task if a new matching action is dispatched.`
    }
  },

  // Custom Native Modules in iOS & Android (mc3)
  {
    id: 'l6',
    courseId: 'mc3',
    index: 1,
    title: 'iOS Swift Bridge Setup',
    description: 'Expose Swift logic to Javascript. Write header bridges and declare native methods to access device sensors.',
    type: 'video',
    duration: '22 min',
    estimatedTime: '25 mins',
    difficulty: 'Advanced',
    status: 'Not Started',
    points: 250,
    objectives: [
      'Register Swift class as RCTBridgeModule',
      'Use RCT_EXPORT_METHOD to expose Swift methods',
      'Integrate thread safety flags'
    ],
    requirements: [
      'iOS simulators installed',
      'Basic Swift language syntax knowledge'
    ],
    components: {
      videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
      duration: '22:15',
      chapters: [
        { time: '00:00', title: 'iOS Native Bridge Introduction' },
        { time: '05:00', title: 'Bridging Headers Configuration' },
        { time: '12:00', title: 'Writing RCTBridge modules' }
      ]
    }
  },

  // AI Prompt Engineering & Personas (mc4)
  {
    id: 'l7',
    courseId: 'mc4',
    index: 1,
    title: 'Prompt Engineering 101',
    description: 'Understand the science of prompting. Set up few-shot profiles and construct robust context matrices.',
    type: 'interactive',
    duration: '14 min',
    estimatedTime: '15 mins',
    difficulty: 'Beginner',
    status: 'Not Started',
    points: 200,
    objectives: [
      'Outline basic structures of optimal prompts',
      'Design role-playing model personas',
      'Explain difference between system instruction and user logs'
    ],
    requirements: [
      'Familiarity with general conversational LLMs'
    ],
    components: {
      flashcards: [
        { front: 'What is few-shot prompting?', back: 'Providing the model with a few examples of inputs and desired outputs to guide its formatting and reasoning.' },
        { front: 'What is a system prompt?', back: 'High-level instructions defined at startup to establish the general rules, style, and boundaries for the assistant.' }
      ],
      quiz: [
        {
          question: 'Which prompting method asks a model to output its intermediate reasoning steps before the final answer?',
          options: ['Zero-shot', 'Chain of Thought (CoT)', 'Persona prompting', 'Few-shot'],
          correctIndex: 1,
          explanation: 'Chain of Thought prompting encourages the LLM to write out its step-by-step reasoning, which significantly improves accuracy in mathematical or logical tasks.'
        }
      ]
    }
  }
];

// In-memory user notes
export interface UserNote {
  id: string;
  lessonId: string;
  timestamp: string;
  text: string;
}

export let USER_NOTES: UserNote[] = [
  { id: 'n1', lessonId: 'l1', timestamp: '02:15', text: 'Main axis switches depending on flexDirection row/col.' },
  { id: 'n2', lessonId: 'l1', timestamp: '05:40', text: 'justifyContent is for distributing main axis space.' }
];

export function addNote(lessonId: string, timestamp: string, text: string) {
  const newNote: UserNote = {
    id: `note-${Date.now()}`,
    lessonId,
    timestamp,
    text
  };
  USER_NOTES = [newNote, ...USER_NOTES];
  return newNote;
}

export function updateLessonStatus(lessonId: string, status: 'Not Started' | 'In Progress' | 'Completed') {
  MOCK_LESSONS = MOCK_LESSONS.map((les) =>
    les.id === lessonId ? { ...les, status } : les
  );
}
