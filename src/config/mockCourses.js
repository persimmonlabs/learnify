/**
 * Mock Course Data
 *
 * Comprehensive collection of 17 pre-generated courses across all 5 cognitive patterns.
 * Each course includes complete module structure, learning objectives, and metadata.
 *
 * Pattern Distribution:
 * - SYSTEMS: 5 courses (AI, Architecture, Trading, Database, Cloud)
 * - CONFLICT: 3 courses (Game Theory, Negotiation, Market Analysis)
 * - LIFECYCLE: 3 courses (Startup Growth, Evolution, Climate)
 * - PIPELINE: 3 courses (Data Engineering, Portuguese, Content Creation)
 * - NARRATIVE: 3 courses (WWII, Storytelling, Portuguese Explorers)
 */

export const MOCK_COURSES = [
  // ==================== SYSTEMS PATTERN ====================
  {
    id: 'course-1',
    title: 'Build an AI Agent from Scratch',
    description: 'Learn to architect, build, and deploy production-ready AI agents using modern frameworks. Master conversation state management, tool integration, and deployment strategies.',
    cognitivePattern: 'SYSTEMS',
    topic: 'Artificial Intelligence',
    difficulty: 'intermediate',
    duration: '12 hours',
    moduleCount: 7,
    enrollmentCount: 1247,
    rating: 4.8,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-1-1',
        title: 'The Atom: Defining the Agent',
        description: 'Understand the fundamental components of an AI agent and its role in systems.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-1-2',
        title: 'The State: Managing Conversation Context',
        description: 'Learn to maintain and manipulate agent state throughout conversations.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-1-3',
        title: 'The Inputs: Processing User Requests',
        description: 'Build robust input handling and validation systems.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-1-4',
        title: 'The Outputs: Generating Intelligent Responses',
        description: 'Design response generation and formatting strategies.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-1-5',
        title: 'The Transformation: Tool Integration',
        description: 'Integrate external tools and APIs into your agent.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-1-6',
        title: 'The Feedback Loops: Continuous Improvement',
        description: 'Implement monitoring and optimization strategies.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-1-7',
        title: 'The Environment: Deployment Strategies',
        description: 'Deploy and scale your agent in production environments.',
        duration: '2.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Define AI agent architecture and core components',
      'Implement conversation state management',
      'Build tool integration layer',
      'Deploy agents to production',
      'Monitor and optimize agent performance'
    ],
    prerequisites: ['Basic Python programming', 'API fundamentals', 'Understanding of REST APIs'],
    variables: {
      ENTITY: 'AI Agent',
      STATE: 'Conversation context',
      INPUTS: 'User queries',
      OUTPUTS: 'Agent responses',
      TRANSFORMATION: 'Tool integration',
      FEEDBACK_LOOPS: 'Performance monitoring',
      ENVIRONMENT: 'Deployment infrastructure'
    }
  },
  {
    id: 'course-2',
    title: 'Web Application Architecture Masterclass',
    description: 'Design scalable, maintainable web applications using modern architectural patterns. Learn MVC, microservices, event-driven design, and cloud-native principles.',
    cognitivePattern: 'SYSTEMS',
    topic: 'Software Engineering',
    difficulty: 'advanced',
    duration: '15 hours',
    moduleCount: 8,
    enrollmentCount: 892,
    rating: 4.9,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-2-1',
        title: 'The Atom: Core Application Components',
        description: 'Identify and design fundamental building blocks.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-2-2',
        title: 'The State: Data Management Patterns',
        description: 'Master state management across frontend and backend.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-2-3',
        title: 'The Inputs: API Design & Validation',
        description: 'Build robust API interfaces and validation layers.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-2-4',
        title: 'The Outputs: Response Formatting',
        description: 'Design efficient response structures and caching.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-2-5',
        title: 'The Transformation: Business Logic Layer',
        description: 'Implement clean business logic separation.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-2-6',
        title: 'The Feedback Loops: Monitoring & Logging',
        description: 'Build comprehensive monitoring systems.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-2-7',
        title: 'The Environment: Cloud-Native Architecture',
        description: 'Deploy scalable cloud infrastructure.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-2-8',
        title: 'Security & Performance Optimization',
        description: 'Implement security best practices and optimize performance.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Design scalable application architectures',
      'Implement microservices patterns',
      'Build event-driven systems',
      'Deploy cloud-native applications',
      'Optimize for performance and security'
    ],
    prerequisites: ['Proficient in JavaScript/TypeScript', 'Understanding of databases', 'Basic DevOps knowledge'],
    variables: {
      ENTITY: 'Web Application',
      STATE: 'Application state',
      INPUTS: 'HTTP requests',
      OUTPUTS: 'API responses',
      TRANSFORMATION: 'Business logic',
      FEEDBACK_LOOPS: 'Monitoring systems',
      ENVIRONMENT: 'Cloud infrastructure'
    }
  },
  {
    id: 'course-3',
    title: 'Trading Bot Design & Implementation',
    description: 'Build automated trading systems from strategy development to production deployment. Learn risk management, backtesting, and live trading execution.',
    cognitivePattern: 'SYSTEMS',
    topic: 'Finance & Trading',
    difficulty: 'advanced',
    duration: '18 hours',
    moduleCount: 9,
    enrollmentCount: 634,
    rating: 4.7,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-3-1',
        title: 'The Atom: Trading Strategy Components',
        description: 'Define core trading strategy elements.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-2',
        title: 'The State: Position & Portfolio Management',
        description: 'Track positions, capital, and portfolio state.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-3',
        title: 'The Inputs: Market Data Processing',
        description: 'Ingest and process real-time market data.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-3-4',
        title: 'The Outputs: Order Execution',
        description: 'Execute trades with proper order types.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-5',
        title: 'The Transformation: Signal Generation',
        description: 'Build indicators and generate trading signals.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-3-6',
        title: 'The Feedback Loops: Performance Analytics',
        description: 'Analyze and optimize trading performance.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-7',
        title: 'The Environment: Exchange Integration',
        description: 'Connect to live trading platforms.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-8',
        title: 'Risk Management Systems',
        description: 'Implement robust risk controls and safeguards.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-3-9',
        title: 'Backtesting & Strategy Validation',
        description: 'Test strategies on historical data.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Design profitable trading strategies',
      'Implement risk management systems',
      'Build backtesting frameworks',
      'Execute live trades programmatically',
      'Analyze trading performance'
    ],
    prerequisites: ['Python programming', 'Basic statistics', 'Understanding of financial markets'],
    variables: {
      ENTITY: 'Trading Bot',
      STATE: 'Portfolio state',
      INPUTS: 'Market data',
      OUTPUTS: 'Trade orders',
      TRANSFORMATION: 'Signal generation',
      FEEDBACK_LOOPS: 'Performance metrics',
      ENVIRONMENT: 'Trading platform'
    }
  },
  {
    id: 'course-4',
    title: 'Database Systems from First Principles',
    description: 'Master database design, optimization, and administration. Learn SQL, NoSQL, indexing strategies, query optimization, and transaction management.',
    cognitivePattern: 'SYSTEMS',
    topic: 'Data Engineering',
    difficulty: 'intermediate',
    duration: '14 hours',
    moduleCount: 7,
    enrollmentCount: 1089,
    rating: 4.6,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-4-1',
        title: 'The Atom: Data Models & Schemas',
        description: 'Design effective data models and schemas.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-4-2',
        title: 'The State: Transaction Management',
        description: 'Implement ACID properties and isolation levels.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-4-3',
        title: 'The Inputs: Query Processing',
        description: 'Write efficient SQL queries and understand execution.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-4-4',
        title: 'The Outputs: Result Optimization',
        description: 'Optimize query results and data retrieval.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-4-5',
        title: 'The Transformation: Indexing Strategies',
        description: 'Build and optimize database indexes.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-4-6',
        title: 'The Feedback Loops: Performance Monitoring',
        description: 'Monitor and tune database performance.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-4-7',
        title: 'The Environment: Scaling & Replication',
        description: 'Scale databases horizontally and vertically.',
        duration: '2 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Design normalized database schemas',
      'Write complex SQL queries',
      'Implement indexing strategies',
      'Optimize query performance',
      'Scale databases for production'
    ],
    prerequisites: ['Basic programming knowledge', 'Understanding of data structures'],
    variables: {
      ENTITY: 'Database',
      STATE: 'Transaction state',
      INPUTS: 'SQL queries',
      OUTPUTS: 'Query results',
      TRANSFORMATION: 'Query execution',
      FEEDBACK_LOOPS: 'Performance metrics',
      ENVIRONMENT: 'Database server'
    }
  },
  {
    id: 'course-5',
    title: 'Cloud Infrastructure Engineering',
    description: 'Build and manage cloud infrastructure using AWS, Docker, Kubernetes, and Infrastructure as Code. Learn CI/CD, monitoring, and cost optimization.',
    cognitivePattern: 'SYSTEMS',
    topic: 'DevOps & Cloud',
    difficulty: 'advanced',
    duration: '16 hours',
    moduleCount: 8,
    enrollmentCount: 756,
    rating: 4.8,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-5-1',
        title: 'The Atom: Cloud Service Components',
        description: 'Understand core cloud services and primitives.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-5-2',
        title: 'The State: Infrastructure State Management',
        description: 'Manage infrastructure state with Terraform.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-5-3',
        title: 'The Inputs: CI/CD Pipelines',
        description: 'Build automated deployment pipelines.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-5-4',
        title: 'The Outputs: Service Deployment',
        description: 'Deploy services to production environments.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-5-5',
        title: 'The Transformation: Container Orchestration',
        description: 'Manage containers with Kubernetes.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-5-6',
        title: 'The Feedback Loops: Observability',
        description: 'Implement logging, metrics, and tracing.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-5-7',
        title: 'The Environment: Multi-Cloud Strategy',
        description: 'Design cloud-agnostic architectures.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-5-8',
        title: 'Security & Cost Optimization',
        description: 'Secure infrastructure and optimize costs.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Deploy cloud infrastructure with IaC',
      'Build CI/CD pipelines',
      'Orchestrate containers with Kubernetes',
      'Implement comprehensive monitoring',
      'Optimize cloud costs'
    ],
    prerequisites: ['Linux command line', 'Basic networking', 'Docker fundamentals'],
    variables: {
      ENTITY: 'Cloud Infrastructure',
      STATE: 'Infrastructure state',
      INPUTS: 'Code commits',
      OUTPUTS: 'Deployed services',
      TRANSFORMATION: 'Build & deploy',
      FEEDBACK_LOOPS: 'Monitoring & alerts',
      ENVIRONMENT: 'Cloud platform'
    }
  },

  // ==================== CONFLICT PATTERN ====================
  {
    id: 'course-6',
    title: 'Game Theory for Startup Success',
    description: 'Apply game theory principles to startup strategy, competition, and market positioning. Learn Nash equilibrium, strategic thinking, and competitive advantage.',
    cognitivePattern: 'CONFLICT',
    topic: 'Business Strategy',
    difficulty: 'intermediate',
    duration: '10 hours',
    moduleCount: 6,
    enrollmentCount: 543,
    rating: 4.7,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-6-1',
        title: 'The Players: Market Participants',
        description: 'Identify competitors, customers, and stakeholders.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-6-2',
        title: 'The Conflict: Competitive Dynamics',
        description: 'Analyze competitive tensions and market forces.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-6-3',
        title: 'The Strategies: Strategic Options',
        description: 'Develop and evaluate strategic alternatives.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-6-4',
        title: 'The Payoffs: Value Creation',
        description: 'Model outcomes and value distribution.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-6-5',
        title: 'The Equilibrium: Market Positioning',
        description: 'Find sustainable competitive positions.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-6-6',
        title: 'The Resolution: Strategic Execution',
        description: 'Execute winning strategies in practice.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Apply game theory to business strategy',
      'Analyze competitive dynamics',
      'Develop winning strategies',
      'Find market equilibrium positions',
      'Execute strategic plans'
    ],
    prerequisites: ['Basic business knowledge', 'Critical thinking skills'],
    variables: {
      PLAYERS: 'Market participants',
      CONFLICT: 'Competition',
      STRATEGIES: 'Strategic options',
      PAYOFFS: 'Value outcomes',
      EQUILIBRIUM: 'Stable position',
      RESOLUTION: 'Strategic execution'
    }
  },
  {
    id: 'course-7',
    title: 'Negotiation Strategies Masterclass',
    description: 'Master the art and science of negotiation in business, law, and everyday life. Learn BATNA, anchoring, framing, and closing techniques.',
    cognitivePattern: 'CONFLICT',
    topic: 'Professional Skills',
    difficulty: 'intermediate',
    duration: '8 hours',
    moduleCount: 6,
    enrollmentCount: 921,
    rating: 4.9,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-7-1',
        title: 'The Players: Understanding Counterparties',
        description: 'Analyze motivations and interests.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-7-2',
        title: 'The Conflict: Identifying Core Issues',
        description: 'Uncover underlying interests and tensions.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-7-3',
        title: 'The Strategies: Tactical Approaches',
        description: 'Master negotiation tactics and techniques.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-7-4',
        title: 'The Payoffs: Creating Value',
        description: 'Design win-win outcomes.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-7-5',
        title: 'The Equilibrium: Reaching Agreement',
        description: 'Find mutually beneficial solutions.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-7-6',
        title: 'The Resolution: Closing Deals',
        description: 'Execute and finalize agreements.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Prepare for high-stakes negotiations',
      'Apply BATNA and anchoring techniques',
      'Create win-win outcomes',
      'Handle difficult counterparties',
      'Close deals effectively'
    ],
    prerequisites: ['None - suitable for all levels'],
    variables: {
      PLAYERS: 'Negotiating parties',
      CONFLICT: 'Divergent interests',
      STRATEGIES: 'Negotiation tactics',
      PAYOFFS: 'Deal terms',
      EQUILIBRIUM: 'Agreement',
      RESOLUTION: 'Deal closure'
    }
  },
  {
    id: 'course-8',
    title: 'Competitive Market Analysis',
    description: 'Analyze markets, competitors, and industry dynamics to gain strategic advantage. Learn Porter\'s Five Forces, SWOT analysis, and market segmentation.',
    cognitivePattern: 'CONFLICT',
    topic: 'Business Strategy',
    difficulty: 'intermediate',
    duration: '9 hours',
    moduleCount: 6,
    enrollmentCount: 487,
    rating: 4.5,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-8-1',
        title: 'The Players: Industry Mapping',
        description: 'Identify and categorize market participants.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-8-2',
        title: 'The Conflict: Competitive Forces',
        description: 'Apply Porter\'s Five Forces framework.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-8-3',
        title: 'The Strategies: Competitive Positioning',
        description: 'Develop differentiation strategies.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-8-4',
        title: 'The Payoffs: Market Share Analysis',
        description: 'Analyze market share and profitability.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-8-5',
        title: 'The Equilibrium: Industry Structure',
        description: 'Understand stable industry configurations.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-8-6',
        title: 'The Resolution: Strategic Recommendations',
        description: 'Develop actionable strategic plans.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Conduct comprehensive market analysis',
      'Apply competitive frameworks',
      'Identify strategic opportunities',
      'Analyze competitor positioning',
      'Develop strategic recommendations'
    ],
    prerequisites: ['Basic business understanding'],
    variables: {
      PLAYERS: 'Industry participants',
      CONFLICT: 'Market competition',
      STRATEGIES: 'Competitive moves',
      PAYOFFS: 'Market outcomes',
      EQUILIBRIUM: 'Industry structure',
      RESOLUTION: 'Strategic plan'
    }
  },

  // ==================== LIFECYCLE PATTERN ====================
  {
    id: 'course-9',
    title: 'Startup Growth Playbook: Zero to Scale',
    description: 'Navigate the complete startup journey from idea validation to scaling. Learn product-market fit, growth hacking, funding, and team building.',
    cognitivePattern: 'LIFECYCLE',
    topic: 'Entrepreneurship',
    difficulty: 'intermediate',
    duration: '13 hours',
    moduleCount: 7,
    enrollmentCount: 1156,
    rating: 4.8,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-9-1',
        title: 'The Origin: Idea Validation',
        description: 'Test and validate your startup idea.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-9-2',
        title: 'The Growth Phase: Building MVP',
        description: 'Create your minimum viable product.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-9-3',
        title: 'The Maturity: Product-Market Fit',
        description: 'Find and validate product-market fit.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-9-4',
        title: 'The Reproduction: Growth Strategies',
        description: 'Scale user acquisition and retention.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-9-5',
        title: 'The Decline: Pivoting & Adaptation',
        description: 'Recognize when to pivot or persevere.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-9-6',
        title: 'The Death/Renewal: Exit Strategies',
        description: 'Plan for acquisition, IPO, or wind-down.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-9-7',
        title: 'The Ecosystem: Funding & Networks',
        description: 'Navigate the startup ecosystem.',
        duration: '2 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Validate startup ideas systematically',
      'Build and launch MVPs',
      'Achieve product-market fit',
      'Scale user growth',
      'Navigate funding rounds'
    ],
    prerequisites: ['Entrepreneurial mindset', 'Basic business knowledge'],
    variables: {
      ORIGIN: 'Idea inception',
      GROWTH: 'MVP development',
      MATURITY: 'Product-market fit',
      REPRODUCTION: 'User growth',
      DECLINE: 'Pivot signals',
      DEATH_RENEWAL: 'Exit planning',
      ECOSYSTEM: 'Funding environment'
    }
  },
  {
    id: 'course-10',
    title: 'Biology of Evolution: From Cells to Complexity',
    description: 'Explore evolutionary biology from molecular origins to complex ecosystems. Understand natural selection, adaptation, and the tree of life.',
    cognitivePattern: 'LIFECYCLE',
    topic: 'Biology & Science',
    difficulty: 'beginner',
    duration: '11 hours',
    moduleCount: 7,
    enrollmentCount: 723,
    rating: 4.6,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-10-1',
        title: 'The Origin: Life\'s Beginnings',
        description: 'Explore theories of abiogenesis.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-10-2',
        title: 'The Growth Phase: Cellular Evolution',
        description: 'From prokaryotes to eukaryotes.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-10-3',
        title: 'The Maturity: Multicellular Life',
        description: 'The rise of complex organisms.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-10-4',
        title: 'The Reproduction: Genetic Inheritance',
        description: 'DNA, genes, and heredity.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-10-5',
        title: 'The Decline: Extinction Events',
        description: 'Mass extinctions and their causes.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-10-6',
        title: 'The Death/Renewal: Adaptation',
        description: 'How species adapt or perish.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-10-7',
        title: 'The Ecosystem: Biodiversity Today',
        description: 'Modern ecosystems and conservation.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Understand evolutionary mechanisms',
      'Trace the tree of life',
      'Explain natural selection',
      'Analyze adaptation strategies',
      'Appreciate biodiversity'
    ],
    prerequisites: ['High school biology helpful but not required'],
    variables: {
      ORIGIN: 'Abiogenesis',
      GROWTH: 'Cellular complexity',
      MATURITY: 'Multicellular organisms',
      REPRODUCTION: 'Genetic transmission',
      DECLINE: 'Extinction',
      DEATH_RENEWAL: 'Adaptation',
      ECOSYSTEM: 'Biodiversity'
    }
  },
  {
    id: 'course-11',
    title: 'Climate Change: Science to Solutions',
    description: 'Understand climate science, impacts, and mitigation strategies. Learn about carbon cycles, renewable energy, and policy solutions.',
    cognitivePattern: 'LIFECYCLE',
    topic: 'Environmental Science',
    difficulty: 'intermediate',
    duration: '10 hours',
    moduleCount: 6,
    enrollmentCount: 612,
    rating: 4.7,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-11-1',
        title: 'The Origin: Earth\'s Climate History',
        description: 'Ice ages to industrial revolution.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-11-2',
        title: 'The Growth Phase: Rising Emissions',
        description: 'The exponential rise of greenhouse gases.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-11-3',
        title: 'The Maturity: Current Climate State',
        description: 'Present-day climate conditions and trends.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-11-4',
        title: 'The Decline: Tipping Points',
        description: 'Critical thresholds and feedback loops.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-11-5',
        title: 'The Death/Renewal: Mitigation Strategies',
        description: 'Renewable energy and carbon capture.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-11-6',
        title: 'The Ecosystem: Global Cooperation',
        description: 'International policy and agreements.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Understand climate science fundamentals',
      'Analyze climate data and trends',
      'Evaluate mitigation strategies',
      'Understand policy frameworks',
      'Take informed climate action'
    ],
    prerequisites: ['Basic science understanding'],
    variables: {
      ORIGIN: 'Pre-industrial climate',
      GROWTH: 'Emissions increase',
      MATURITY: 'Current warming',
      DECLINE: 'Climate tipping points',
      DEATH_RENEWAL: 'Solutions',
      ECOSYSTEM: 'Global cooperation'
    }
  },

  // ==================== PIPELINE PATTERN ====================
  {
    id: 'course-12',
    title: 'Data Engineering Fundamentals',
    description: 'Build end-to-end data pipelines from ingestion to visualization. Master ETL, data warehousing, and analytics engineering.',
    cognitivePattern: 'PIPELINE',
    topic: 'Data Engineering',
    difficulty: 'intermediate',
    duration: '14 hours',
    moduleCount: 7,
    enrollmentCount: 893,
    rating: 4.7,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-12-1',
        title: 'The Input: Data Ingestion',
        description: 'Collect data from multiple sources.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-12-2',
        title: 'The Validation: Data Quality Checks',
        description: 'Ensure data accuracy and completeness.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-12-3',
        title: 'The Transformation: ETL Processes',
        description: 'Clean, transform, and enrich data.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-12-4',
        title: 'The Storage: Data Warehousing',
        description: 'Design and implement data warehouses.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-12-5',
        title: 'The Processing: Batch & Stream Processing',
        description: 'Process data at scale.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-12-6',
        title: 'The Analysis: Analytics Engineering',
        description: 'Build data models for analysis.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-12-7',
        title: 'The Output: Visualization & Reporting',
        description: 'Create dashboards and reports.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Build scalable data pipelines',
      'Implement ETL processes',
      'Design data warehouses',
      'Process streaming data',
      'Create analytics dashboards'
    ],
    prerequisites: ['SQL proficiency', 'Basic Python', 'Database fundamentals'],
    variables: {
      INPUT: 'Raw data sources',
      VALIDATION: 'Quality checks',
      TRANSFORMATION: 'ETL logic',
      STORAGE: 'Data warehouse',
      PROCESSING: 'Compute jobs',
      ANALYSIS: 'Data models',
      OUTPUT: 'Dashboards'
    }
  },
  {
    id: 'course-13',
    title: 'Learn Portuguese in 30 Days',
    description: 'Practical Portuguese for travelers and beginners. Learn essential vocabulary, grammar, and conversation skills through structured daily lessons.',
    cognitivePattern: 'PIPELINE',
    topic: 'Language Learning',
    difficulty: 'beginner',
    duration: '15 hours',
    moduleCount: 7,
    enrollmentCount: 1834,
    rating: 4.9,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-13-1',
        title: 'The Input: Listening & Pronunciation',
        description: 'Train your ear for Portuguese sounds.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-13-2',
        title: 'The Validation: Grammar Foundations',
        description: 'Master essential grammar rules.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-13-3',
        title: 'The Transformation: Vocabulary Building',
        description: 'Learn 500+ essential words and phrases.',
        duration: '3 hours',
        status: 'locked'
      },
      {
        id: 'module-13-4',
        title: 'The Storage: Memory Techniques',
        description: 'Use spaced repetition and mnemonics.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-13-5',
        title: 'The Processing: Practice Exercises',
        description: 'Daily speaking and writing practice.',
        duration: '3 hours',
        status: 'locked'
      },
      {
        id: 'module-13-6',
        title: 'The Analysis: Self-Assessment',
        description: 'Track progress and identify gaps.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-13-7',
        title: 'The Output: Real Conversations',
        description: 'Apply skills in authentic contexts.',
        duration: '2 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Hold basic conversations in Portuguese',
      'Understand essential grammar',
      'Build 500+ word vocabulary',
      'Read simple texts',
      'Navigate travel situations'
    ],
    prerequisites: ['None - complete beginner friendly'],
    variables: {
      INPUT: 'Portuguese audio',
      VALIDATION: 'Grammar rules',
      TRANSFORMATION: 'Vocabulary acquisition',
      STORAGE: 'Memory retention',
      PROCESSING: 'Practice',
      ANALYSIS: 'Progress tracking',
      OUTPUT: 'Conversation'
    }
  },
  {
    id: 'course-14',
    title: 'Content Creation Workflow',
    description: 'Master the content creation pipeline from ideation to distribution. Learn research, writing, editing, design, and promotion strategies.',
    cognitivePattern: 'PIPELINE',
    topic: 'Content & Marketing',
    difficulty: 'beginner',
    duration: '9 hours',
    moduleCount: 7,
    enrollmentCount: 1267,
    rating: 4.6,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-14-1',
        title: 'The Input: Research & Ideation',
        description: 'Generate and validate content ideas.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-14-2',
        title: 'The Validation: Audience Analysis',
        description: 'Understand your target audience.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-14-3',
        title: 'The Transformation: Writing & Design',
        description: 'Create compelling content.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-14-4',
        title: 'The Storage: Content Libraries',
        description: 'Organize and archive content assets.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-14-5',
        title: 'The Processing: Editing & Refinement',
        description: 'Polish content to perfection.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-14-6',
        title: 'The Analysis: Performance Metrics',
        description: 'Measure content effectiveness.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-14-7',
        title: 'The Output: Distribution & Promotion',
        description: 'Amplify your content reach.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Develop content strategies',
      'Create engaging content',
      'Optimize for SEO',
      'Measure performance',
      'Grow audience reach'
    ],
    prerequisites: ['None - suitable for beginners'],
    variables: {
      INPUT: 'Ideas & research',
      VALIDATION: 'Audience fit',
      TRANSFORMATION: 'Content creation',
      STORAGE: 'Asset management',
      PROCESSING: 'Editing',
      ANALYSIS: 'Metrics',
      OUTPUT: 'Distribution'
    }
  },

  // ==================== NARRATIVE PATTERN ====================
  {
    id: 'course-15',
    title: 'History of World War II: Complete Chronicle',
    description: 'Follow the complete narrative of WWII from rise of fascism to post-war reconstruction. Understand causes, key battles, and lasting impacts.',
    cognitivePattern: 'NARRATIVE',
    topic: 'History',
    difficulty: 'intermediate',
    duration: '16 hours',
    moduleCount: 8,
    enrollmentCount: 1543,
    rating: 4.9,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-15-1',
        title: 'The Setup: Interwar Period (1918-1939)',
        description: 'Treaty of Versailles and rise of totalitarianism.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-15-2',
        title: 'The Inciting Incident: Invasion of Poland',
        description: 'The war begins in September 1939.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-15-3',
        title: 'Rising Action: Axis Expansion (1940-1941)',
        description: 'Fall of France and Battle of Britain.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-15-4',
        title: 'The Climax: Turning Points (1942-1943)',
        description: 'Stalingrad, Midway, and El Alamein.',
        duration: '2.5 hours',
        status: 'locked'
      },
      {
        id: 'module-15-5',
        title: 'Falling Action: Allied Offensive (1944)',
        description: 'D-Day and liberation of Europe.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-15-6',
        title: 'The Resolution: Victory & Aftermath (1945)',
        description: 'Surrender of Germany and Japan.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-15-7',
        title: 'The Denouement: Post-War Order',
        description: 'UN formation and Cold War origins.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-15-8',
        title: 'The Theme: Lessons & Legacy',
        description: 'Understanding WWII\'s lasting impact.',
        duration: '2 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Understand WWII chronology',
      'Analyze key battles and strategies',
      'Explore political and social impacts',
      'Evaluate historical significance',
      'Draw lessons for modern times'
    ],
    prerequisites: ['Basic world history knowledge'],
    variables: {
      SETUP: 'Interwar tensions',
      INCITING_INCIDENT: 'War outbreak',
      RISING_ACTION: 'Axis victories',
      CLIMAX: 'Turning points',
      FALLING_ACTION: 'Allied advance',
      RESOLUTION: 'War ends',
      DENOUEMENT: 'New world order',
      THEME: 'Historical lessons'
    }
  },
  {
    id: 'course-16',
    title: 'Storytelling for Business Impact',
    description: 'Master the art of business storytelling for pitches, presentations, and leadership. Learn narrative structure, emotional resonance, and persuasive techniques.',
    cognitivePattern: 'NARRATIVE',
    topic: 'Communication & Leadership',
    difficulty: 'intermediate',
    duration: '8 hours',
    moduleCount: 7,
    enrollmentCount: 1098,
    rating: 4.8,
    thumbnail: null,
    isNew: true,
    modules: [
      {
        id: 'module-16-1',
        title: 'The Setup: Audience & Context',
        description: 'Understand your audience and situation.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-16-2',
        title: 'The Inciting Incident: The Hook',
        description: 'Capture attention in the first 30 seconds.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-16-3',
        title: 'Rising Action: Building Tension',
        description: 'Create engagement through narrative arc.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-16-4',
        title: 'The Climax: Core Message',
        description: 'Deliver your key insight or solution.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-16-5',
        title: 'Falling Action: Supporting Evidence',
        description: 'Reinforce with data and examples.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-16-6',
        title: 'The Resolution: Call to Action',
        description: 'Drive audience to desired outcome.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-16-7',
        title: 'The Theme: Emotional Resonance',
        description: 'Create lasting impact through emotion.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Structure compelling business narratives',
      'Craft memorable pitches',
      'Use storytelling in leadership',
      'Connect emotionally with audiences',
      'Drive action through stories'
    ],
    prerequisites: ['Basic presentation skills'],
    variables: {
      SETUP: 'Context setting',
      INCITING_INCIDENT: 'Opening hook',
      RISING_ACTION: 'Engagement',
      CLIMAX: 'Key message',
      FALLING_ACTION: 'Evidence',
      RESOLUTION: 'Call to action',
      THEME: 'Emotional core'
    }
  },
  {
    id: 'course-17',
    title: 'The Portuguese Explorers: Age of Discovery',
    description: 'Journey through Portugal\'s maritime exploration from Henry the Navigator to Vasco da Gama. Discover how a small nation changed the world.',
    cognitivePattern: 'NARRATIVE',
    topic: 'History',
    difficulty: 'beginner',
    duration: '10 hours',
    moduleCount: 7,
    enrollmentCount: 687,
    rating: 4.7,
    thumbnail: null,
    isNew: false,
    modules: [
      {
        id: 'module-17-1',
        title: 'The Setup: Medieval Portugal',
        description: 'Portugal emerges as an independent nation.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-17-2',
        title: 'The Inciting Incident: Henry the Navigator',
        description: 'The prince who launched exploration.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-17-3',
        title: 'Rising Action: African Coast Exploration',
        description: 'Pushing south along Africa.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-17-4',
        title: 'The Climax: Vasco da Gama Reaches India',
        description: 'The sea route to Asia is discovered.',
        duration: '2 hours',
        status: 'locked'
      },
      {
        id: 'module-17-5',
        title: 'Falling Action: Global Empire Building',
        description: 'Portuguese colonies span the globe.',
        duration: '1.5 hours',
        status: 'locked'
      },
      {
        id: 'module-17-6',
        title: 'The Resolution: Decline of Empire',
        description: 'Competition from other European powers.',
        duration: '1 hour',
        status: 'locked'
      },
      {
        id: 'module-17-7',
        title: 'The Theme: Cultural Legacy',
        description: 'Portuguese influence on global culture.',
        duration: '1.5 hours',
        status: 'locked'
      }
    ],
    learningObjectives: [
      'Understand Portuguese exploration',
      'Learn about key explorers and voyages',
      'Explore cultural exchanges',
      'Analyze empire building',
      'Appreciate historical legacy'
    ],
    prerequisites: ['Basic world history helpful'],
    variables: {
      SETUP: 'Medieval Portugal',
      INCITING_INCIDENT: 'Exploration begins',
      RISING_ACTION: 'Voyages expand',
      CLIMAX: 'India route',
      FALLING_ACTION: 'Empire growth',
      RESOLUTION: 'Empire decline',
      THEME: 'Global legacy'
    }
  }
];

export default MOCK_COURSES;
