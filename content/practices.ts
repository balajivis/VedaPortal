// Practice content data for Veda Portal

export interface Practice {
  id: string
  name: string
  sanskrit: string
  tagline: string
  description: string
  duration?: string
  frequency?: string
  keyBenefits: string[]
  content: string // Full markdown content
}

export interface PracticeCategory {
  id: string
  name: string
  sanskrit: string
  description: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  hoverBg: string
  practices: Practice[]
}

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    id: 'daily',
    name: 'Daily Practices',
    sanskrit: 'नित्य कर्म',
    description: 'Essential daily rituals that form the foundation of Vedic living. These practices align you with natural rhythms and maintain spiritual connection.',
    icon: '🌅',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/30',
    borderColor: 'border-amber-600/30',
    hoverBg: 'hover:bg-amber-950/50',
    practices: [
      {
        id: 'sandhyavandanam',
        name: 'Sandhyavandanam',
        sanskrit: 'सन्ध्यावन्दनम्',
        tagline: 'The Thread That Binds Time',
        description: 'The thrice-daily twilight meditation performed at dawn, noon, and dusk. History\'s first "habit stack" integrating breathwork, meditation, gratitude, and nature connection.',
        duration: '15-30 minutes',
        frequency: 'Three times daily',
        keyBenefits: [
          'Stress control through 39 daily pranayamas',
          'Mental clarity from mindfulness practice',
          'Family bonding through collective prayer',
          'Nature connection and gratitude',
          'Habit stacking foundation',
          'Community consciousness'
        ],
        content: `Sandhyavandanam isn't just a ritual—it's an ancient technology for human flourishing, disguised as prayer.

## The Architecture of Ancient Wisdom

Three thousand years ago, our rishis faced the same challenges we do today: How to maintain mental clarity in chaos? How to build resilience against disease? How to stay connected to something larger than ourselves?

Their solution was elegant: a practice performed at the three junctions (sandhis) of day that would address every aspect of human well-being.

What they created was perhaps history's first example of "habit stacking"—a term modern productivity experts use for linking multiple beneficial behaviors:

- **Physical cleansing** (Achamaneyam)
- **Breathwork** (39 pranayamas throughout the day)
- **Meditation** (Gayatri japa)
- **Gratitude practices** (Tharpanam)
- **Nature connection** (sun salutations)
- **Community bonding** (family participation)

## The Breath That Saved Civilizations

Thirty-nine controlled breathing exercises spread throughout the day might seem excessive, until you understand their purpose.

In the morning, the pranayamas awaken the system gently. At noon, when stress peaks and decisions multiply, they provide a reset. In the evening, they prepare the body for rest.

The Achamaneyam—the ritual sipping of water while touching various parts of the body—created hygiene barriers that helped Vedic communities survive epidemics that decimated other ancient civilizations.

## The Mantra in the Marketplace

The heart of Sandhyavandanam is the Gayatri mantra—those 24 syllables that have echoed through time. Unlike guided meditations that require quiet spaces and perfect conditions, the Gayatri becomes an internal refuge.

The ancient sages understood something neuroscience now confirms: repetitive sacred sounds create measurable changes in brain wave patterns, reducing anxiety and improving focus.

## Gratitude as Architecture

The Tharpanam and Upasthana mantras are carefully structured appreciations that expand outward in concentric circles:

1. Gratitude to water—the source of life
2. To the sun—the source of energy
3. To the rishis—the source of knowledge
4. To ancestors—the source of our being
5. To all beings—recognizing our interconnection

This structured gratitude practice, performed when cortisol levels naturally shift (dawn, noon, dusk), literally rewires the brain's default mode network.

## A Practice for Our Times

**For the Traveling Professional**: Airport prayer rooms, hotel bathrooms, and office wellness spaces can accommodate abbreviated practices.

**For the Urban Dweller**: A balcony, a park bench, or even a shower can substitute for rivers.

**For the Time-Pressed**: Even five minutes of core mantras maintains the thread.

**For the Family**: Making it a shared practice transforms obligation into bonding.`
      },
      {
        id: 'brahmayajna',
        name: 'Brahmayajna',
        sanskrit: 'ब्रह्मयज्ञ',
        tagline: 'The 5-Minute Daily Practice',
        description: 'A brief daily practice honoring the three cosmic forces: Devas (divine forces), Rishis (wisdom keepers), and Pitrus (ancestors). Think of it as a daily "system update" for your spiritual operating system.',
        duration: '5 minutes',
        frequency: 'Daily after midday prayers',
        keyBenefits: [
          'Structured gratitude practice',
          'Cognitive enhancement through recitation',
          'Stress reduction',
          'Connection to tradition',
          'Enhanced decision making',
          'Relationship improvement'
        ],
        content: `## What is Brahmayajna?

Brahmayajna is a brief daily practice performed after midday prayers where practitioners:

- Recite opening verses from the four Vedas
- Honor the three cosmic forces that sustain dharma
- Take 5 minutes to consciously connect with the entire knowledge tradition

Think of it as a daily "system update" for your spiritual operating system.

## The Three Pillars

### Devas - Natural Forces and Systems
**Ancient Understanding**: Divine beings governing natural forces
**Modern Translation**: The systems that support life
- Develops ecological consciousness and systems thinking

### Rishis - Knowledge Creators and Transmitters
**Ancient Understanding**: Sages who received and shared wisdom
**Modern Translation**: All teachers, scientists, innovators who advanced human knowledge
- Cultivates learning mindset and respect for expertise

### Pitrus - Ancestral Wisdom and Genetic Heritage
**Ancient Understanding**: Ancestral spirits requiring propitiation
**Modern Translation**: Your genetic, cultural, and knowledge inheritance
- Heals generational trauma, improves family relationships

## Scientific Correlations

### Neuroscience Perspective
- **Vagus Nerve Activation**: Chanting activates the vagus nerve
- **Default Mode Network**: Regular practice optimizes brain's resting state
- **Neuroplasticity**: Creates new neural pathways through consistent practice

### Psychology Perspective
- **Ritual Effect**: Structured rituals reduce anxiety
- **Attribution Theory**: Acknowledging support systems improves resilience
- **Social Identity Theory**: Strengthens positive group identity`
      },
      {
        id: 'pranayama-vyahritis',
        name: 'Pranayama with Vyahritis',
        sanskrit: 'सप्त व्याहृति प्राणायाम',
        tagline: 'The Sacred Breath Practice',
        description: 'The seven Vyahritis (cosmic planes) integrated with pranayama, connecting breath to the seven levels of consciousness from physical earth to ultimate truth.',
        duration: '10-15 minutes',
        frequency: 'During Sandhyavandanam',
        keyBenefits: [
          'Consciousness elevation',
          'Chakra activation',
          'Breath regulation',
          'Mental clarity',
          'Energy balancing',
          'Spiritual connection'
        ],
        content: `## The Seven Vyahritis - Cosmic Planes

| Vyahriti | Sanskrit | Cosmic Plane | Body Location | Consciousness Level |
|----------|----------|--------------|---------------|---------------------|
| **Bhuh** | भूः | Physical/Earth | Muladhara to Manipura | Body consciousness |
| **Bhuvah** | भुवः | Vital/Astral | Manipura to Anahata | Pranic awareness |
| **Suvah** | स्वः | Mental/Heaven | Anahata to Ajna | Mental consciousness |
| **Mahah** | महः | Supra-Mental | Ajna to Sahasrara | Higher mind/Intuition |
| **Janah** | जनः | Bliss/Creation | Above Sahasrara | Creative consciousness |
| **Tapah** | तपः | Consciousness | Higher koshas | Transformative awareness |
| **Satyam** | सत्यम् | Truth/Absolute | Infinite | Pure consciousness |

## The Practice

During Sandhyavandanam pranayama, each vyahriti is chanted while holding the breath, progressively elevating consciousness through all seven planes.

The integration of breath control with cosmic invocation creates a powerful technology for spiritual elevation that has been practiced unchanged for thousands of years.`
      },
      {
        id: 'pariseshanam',
        name: 'Pariseshanam',
        sanskrit: 'परिषेचनम्',
        tagline: 'Sacred Eating & Five Pranas',
        description: 'The ritual of offering food to the five pranas before eating, transforming every meal into a sacred act that nourishes body, mind, and spirit.',
        duration: '2-3 minutes',
        frequency: 'Before every meal',
        keyBenefits: [
          'Mindful eating',
          'Better digestion',
          'Gratitude practice',
          'Energy balancing',
          'Spiritual awareness',
          'Food appreciation'
        ],
        content: `## The Five Prana Offerings

Before eating, traditional Hindus perform:

1. **Prokshana**: Sprinkle water clockwise around the plate
2. **Mantras**: Recite purification verses
3. **Five Offerings** with specific mantras:
   - "Om Pranaya Swaha" (प्राणाय स्वाहा)
   - "Om Apanaya Swaha" (अपानाय स्वाहा)
   - "Om Vyanaya Swaha" (व्यानाय स्वाहा)
   - "Om Udanaya Swaha" (उदानाय स्वाहा)
   - "Om Samanaya Swaha" (समानाय स्वाहा)
4. **Final Offering**: "Om Brahmane Swaha"

## The Five Pranas

| Prana | Location | Function | Modern Correlation |
|-------|----------|----------|-------------------|
| **Prana** | Head & Chest | Inhalation, swallowing, sensory intake | Respiratory system, CNS |
| **Apana** | Pelvic Region | Elimination, reproduction | Enteric nervous system |
| **Vyana** | Throughout Body | Circulation, nutrient distribution | Cardiovascular system |
| **Udana** | Throat Region | Speech, expression, growth | Thyroid, speech centers |
| **Samana** | Navel Area | Digestion, absorption, metabolism | Digestive system |

## The Deep Meaning

This isn't mere food blessing—it's acknowledging that:
- We're not just feeding the body but the life force
- Digestion involves multiple energy systems
- Food transforms into consciousness
- Eating is a yajna (sacred offering)`
      }
    ]
  },
  {
    id: 'rituals',
    name: 'Life Rituals',
    sanskrit: 'संस्कार',
    description: 'Sacred ceremonies marking life\'s transitions and connecting us to cosmic rhythms. From birth to death, these rituals provide structure and meaning.',
    icon: '🔥',
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/30',
    borderColor: 'border-orange-600/30',
    hoverBg: 'hover:bg-orange-950/50',
    practices: [
      {
        id: 'samskaras',
        name: 'The 40 Samskaras',
        sanskrit: 'चत्वारिंशत् संस्काराः',
        tagline: 'Hindu Life\'s Complete Framework',
        description: 'The comprehensive system of 40 life rituals covering conception to death—a sophisticated framework for human development that modern science increasingly validates.',
        keyBenefits: [
          'Biological milestone recognition',
          'Psychological anchoring',
          'Social integration',
          'Spiritual evolution',
          'Family bonding',
          'Cultural continuity'
        ],
        content: `## Understanding Samskaras

The Sanskrit term "Samskara" (संस्कार) means "to refine" or "to perfect." These are:

- **Biological markers**: Recognizing critical developmental stages
- **Psychological anchors**: Creating positive neural pathways through ceremony
- **Social integration**: Marking one's place in community
- **Spiritual evolution**: Aligning individual growth with cosmic rhythms

## The 40 Samskaras Framework

| Category | Number | Frequency | Complexity |
|----------|--------|-----------|------------|
| Life-cycle rites | 16 | Once in lifetime | Variable |
| Soma Yajnas | 7 | Rarely | Extremely complex |
| Havir Yajnas | 7 | Occasionally | Moderately complex |
| Paka Yajnas | 7 | Regularly | Relatively simple |
| Pancha Mahayajnas | 5 | Daily | Simple but essential |

## The 16 Life-Cycle Samskaras

### Pre-natal (3)
1. **Garbhadhana** - Conception ceremony
2. **Pumsavana** - Third month blessing
3. **Simantonnayana** - Hair-parting ceremony

### Childhood (5)
4. **Jatakarma** - Birth ceremony
5. **Namakarana** - Naming ceremony (11th day)
6. **Nishkramana** - First outing (4th month)
7. **Annaprasana** - First solid food (6th month)
8. **Chudakarana** - First haircut

### Education (4)
9. **Karnavedha** - Ear piercing
10. **Vidyarambha** - Learning initiation
11. **Upanayanam** - Sacred thread ceremony
12. **Vedarambha** - Vedic study begins

### Adulthood (4)
13. **Keshanta** - First shave
14. **Samavartana** - Graduation
15. **Vivaha** - Marriage
16. **Antyeshti** - Funeral rites`
      },
      {
        id: 'upanayanam',
        name: 'Upanayanam',
        sanskrit: 'उपनयनम्',
        tagline: 'The Sacred Thread Ceremony',
        description: 'The initiation ceremony marking the beginning of Vedic education. The child receives the sacred thread and Gayatri mantra, becoming a "twice-born" (dvija).',
        keyBenefits: [
          'Spiritual initiation',
          'Vedic education access',
          'Family lineage connection',
          'Discipline foundation',
          'Identity formation',
          'Community belonging'
        ],
        content: `## The Nine Sacred Rituals

### 1. Naandhi (Nandi Shrardham)
A pre-ceremony ritual to honor and seek blessings of ancestors (Pitrus).

### 2. Udaka Shanti
Vedic purification with sacred water and mantras to invoke peace and remove obstacles.

### 3. Kumara Bhojanam
The vatu shares a simple meal with other young boys, representing humility.

### 4. Yagnopaveetha Dharanam
The central rite—investiture with the sacred thread over the left shoulder.

### 5. Brahmopadesam
The father whispers the Gayatri Mantra into the child's ear—the spiritual core of Vedic wisdom.

### 6. Surya Darshanam
Offering water (Argyam) and salutations to Surya, the eternal teacher.

### 7. Ashwattha Darshanam
Holding a twig from the sacred Peepal tree, affirming connection to dharma.

### 8. Bhikshakaranam
Asking mother and elders for alms (bhiksha)—beginning the Brahmachari's vow.

### 9. Abhivadhanam
Formally reciting gotra, pravara, and lineage—declaring identity in the sacred chain.`
      },
      {
        id: 'yajnas',
        name: 'Yajnas & Homas',
        sanskrit: 'यज्ञ',
        tagline: 'Sacred Fire Rituals',
        description: 'Fire ceremonies that transform material offerings into spiritual merit. From simple daily homas to elaborate multi-day yajnas, fire becomes the bridge between human and divine.',
        keyBenefits: [
          'Spiritual transformation',
          'Environmental purification',
          'Community bonding',
          'Cosmic harmony',
          'Merit accumulation',
          'Ancestral connection'
        ],
        content: `## Understanding Yajnas

The Sanskrit "Yajna" (यज्ञ) means "to worship, to sacrifice, to bestow." Vedic sacrifice isn't about loss—it's about transformation.

## The 21 Core Yajnas

| Category | Count | Complexity | Primary Ingredient |
|----------|-------|------------|-------------------|
| **Paka Yajnas** | 7 | Simple | Cooked food |
| **Havir Yajnas** | 7 | Moderate | Ghee |
| **Soma Yajnas** | 7 | Complex | Soma juice |

## The Seven Paka Yajnas

1. **Pitru Shraddha** - Annual ancestor remembrance
2. **Parvana Shraddha** - Monthly ancestor offering
3. **Ashtaka** - Winter ancestor festivals
4. **Shravani** - Monsoon snake protection
5. **Agrahayani** - Harvest gratitude
6. **Chaitri** - Spring renewal
7. **Ashvayuji** - Autumn thanksgiving

## The Science of Fire Rituals

Fire ceremonies combine multiple consciousness-altering elements:
- **Visual**: Mesmerizing flame patterns
- **Olfactory**: Medicinal smoke from herbs
- **Auditory**: Rhythmic mantras and music
- **Kinesthetic**: Ritual movements
- **Chemical**: Smoke-borne compounds affecting brain

Studies show participants exhibit increased alpha brainwaves, enhanced immune response, and stronger community bonding.`
      },
      {
        id: 'puja-upachara',
        name: 'Shodasa Upachara',
        sanskrit: 'षोडशोपचार',
        tagline: 'The 16 Sacred Offerings',
        description: 'The complete puja ritual with 16 offerings, treating the deity as an honored guest with hospitality that activates devotional emotions and creates sacred time.',
        duration: '30-60 minutes',
        keyBenefits: [
          'Devotional connection',
          'Structured worship',
          'Mindfulness practice',
          'Emotional purification',
          'Sacred hospitality',
          'Spiritual focus'
        ],
        content: `## The 16 Steps of Puja

| # | Sanskrit | English | Offering |
|---|----------|---------|----------|
| 1 | Avahana | Inviting | Welcome the deity |
| 2 | Asana | Seat | Offer a seat |
| 3 | Padya | Feet washing | Water for feet |
| 4 | Arghya | Offering | Water for hands |
| 5 | Achamana | Sipping | Water to drink |
| 6 | Snana | Bathing | Ceremonial bath |
| 7 | Vastra | Clothing | Offer garments |
| 8 | Yajnopavita | Sacred thread | Offer thread |
| 9 | Gandha | Sandalwood | Apply paste |
| 10 | Pushpa | Flowers | Offer flowers |
| 11 | Dhupa | Incense | Light incense |
| 12 | Dipa | Lamp | Light lamp |
| 13 | Naivedya | Food | Offer food |
| 14 | Tambula | Betel | Offer betel leaves |
| 15 | Pradakshina | Circumambulation | Walk around |
| 16 | Namaskara | Prostration | Final bow |

## Psychological Function

Puja creates "sacred hospitality"—treating the divine as an honored guest. This activates devotional emotions and creates structured sacred time in daily life.`
      },
      {
        id: 'pathas',
        name: 'Vedic Pathas',
        sanskrit: 'वेदपाठ',
        tagline: 'The 11 Recitation Methods',
        description: 'The sophisticated system of Vedic recitation methods designed to preserve texts unchanged for millennia through mathematical patterns and mnemonic techniques.',
        keyBenefits: [
          'Perfect preservation',
          'Memory enhancement',
          'Cognitive training',
          'Meditative focus',
          'Tradition connection',
          'Sound science'
        ],
        content: `## The 11 Pathas (Recitation Methods)

The Vedas have been preserved through 11 increasingly complex recitation patterns:

### Basic Pathas (3)
1. **Samhita Patha** - Continuous recitation
2. **Pada Patha** - Word-by-word recitation
3. **Krama Patha** - Sequential pairs (1-2, 2-3, 3-4...)

### Intermediate Pathas (3)
4. **Jata Patha** - Forward-backward pattern
5. **Mala Patha** - Garland pattern
6. **Shikha Patha** - Topknot pattern

### Advanced Pathas (5)
7. **Rekha Patha** - Line pattern
8. **Dhwaja Patha** - Flag pattern
9. **Danda Patha** - Staff pattern
10. **Ratha Patha** - Chariot pattern
11. **Ghana Patha** - Dense/bell pattern

## Why So Complex?

These patterns create:
- **Redundancy**: Multiple ways to verify correct text
- **Error detection**: Wrong words break the pattern
- **Memory aids**: Mathematical patterns help retention
- **Meditative depth**: Complex recitation requires total focus

This system preserved the Vedas unchanged for 3,000+ years—longer than any other oral tradition in human history.`
      }
    ]
  },
  {
    id: 'sadhanas',
    name: 'Spiritual Practices',
    sanskrit: 'साधना',
    description: 'Technologies of transformation for consciousness elevation. From simple mantras to elaborate ceremonies, practices suited to every personality and life stage.',
    icon: '🧘',
    color: 'text-violet-400',
    bgColor: 'bg-violet-950/30',
    borderColor: 'border-violet-600/30',
    hoverBg: 'hover:bg-violet-950/50',
    practices: [
      {
        id: 'sadhanas-overview',
        name: '30 Essential Sadhanas',
        sanskrit: 'त्रिंशत् साधनाः',
        tagline: 'Complete Guide to Spiritual Practices',
        description: 'Thirty different ways to connect with the divine—from simple mental chants to elaborate fire ceremonies. A sophisticated toolkit adaptable to every personality, circumstance, and life stage.',
        keyBenefits: [
          'Consciousness elevation',
          'Mental purification',
          'Energy optimization',
          'Social harmony',
          'Divine communion',
          'Personal transformation'
        ],
        content: `## Understanding Sadhanas

The word "Sadhana" from Sanskrit root "sadh" means "to accomplish" or "to make perfect." These are refined technologies for transformation.

## Categories of Sadhanas

### I. Fire & Ritual Practices
1. **Yajna** - Sacred fire ceremonies
2. **Puja** - Deity worship ritual
3. **Arati** - Light worship
4. **Abhisheka** - Sacred bathing
5. **Homa** - Fire offerings

### II. Sound & Mantra Practices
6. **Japa** - Mantra repetition
7. **Kirtan** - Devotional singing
8. **Stotra** - Hymn recitation
9. **Parayana** - Scripture reading
10. **Nama Sankirtana** - Name chanting

### III. Body & Breath Practices
11. **Pranayama** - Breath control
12. **Yoga Asanas** - Physical postures
13. **Mudras** - Sacred gestures
14. **Bandhas** - Energy locks
15. **Kriya** - Cleansing practices

### IV. Mind & Meditation Practices
16. **Dhyana** - Meditation
17. **Dharana** - Concentration
18. **Trataka** - Gazing meditation
19. **Yoga Nidra** - Conscious sleep
20. **Visualization** - Mental imagery

### V. Service & Devotion Practices
21. **Seva** - Selfless service
22. **Dana** - Charitable giving
23. **Tirtha Yatra** - Pilgrimage
24. **Vrata** - Sacred vows
25. **Upavasa** - Fasting

### VI. Study & Wisdom Practices
26. **Svadhyaya** - Self-study
27. **Satsang** - Holy company
28. **Guru Seva** - Teacher service
29. **Shravanam** - Listening to wisdom
30. **Mananam** - Contemplation

Each practice serves different needs and personalities. The genius of the Hindu system is offering multiple paths to the same goal.`
      }
    ]
  },
  {
    id: 'wisdom',
    name: 'Wisdom Traditions',
    sanskrit: 'ज्ञान परम्परा',
    description: 'The sages, texts, and teachings that form the foundation of Vedic knowledge. Understanding the sources helps us apply their wisdom today.',
    icon: '📜',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/30',
    borderColor: 'border-emerald-600/30',
    hoverBg: 'hover:bg-emerald-950/50',
    practices: [
      {
        id: 'rishis',
        name: 'The Seven Rishis',
        sanskrit: 'सप्तर्षि',
        tagline: 'Sages Who Shaped Civilization',
        description: 'The Saptarishis—seven immortal sages who serve as humanity\'s guides. Founders of gotras, original scientists, and the "brain" of humanity\'s spiritual evolution.',
        keyBenefits: [
          'Lineage understanding',
          'Spiritual guidance',
          'Scientific foundation',
          'Cultural roots',
          'Gotra knowledge',
          'Astronomical connection'
        ],
        content: `## The Saptarishis

The seven stars of Ursa Major (Big Dipper) are believed to be the Saptarishis—the foundational pillars of Indian knowledge systems.

## The Current Seven Rishis

### 1. Atri (अत्रि) - The Devourer of Darkness
- Composer of Rigveda's fifth Mandala
- Father of Dattatreya and Durvasa
- Contributions to astronomy and Ayurveda

### 2. Vashishtha (वसिष्ठ) - The Most Excellent
- Owner of Kamadhenu (wish-fulfilling cow)
- Royal priest to Solar Dynasty
- Author of Vashishtha Yoga

### 3. Kashyapa (कश्यप) - Father of All Living Beings
- Universal progenitor
- Father of Devas, Asuras, Nagas, and humans
- Contributions to genetics understanding

### 4. Vishwamitra (विश्वामित्र) - Friend of the Universe
- Discovered the Gayatri Mantra
- Only Kshatriya to become Brahmarishi
- Created parallel universe (Trishanku's heaven)

### 5. Gautama (गौतम) - The Bright One
- Founder of Nyaya (Logic) philosophy
- Husband of Ahalya
- Contributions to jurisprudence

### 6. Jamadagni (जमदग्नि) - Fire-Born
- Father of Parashurama
- Master of weapons and warfare
- Dhanurveda contributions

### 7. Bharadvaja (भरद्वाज) - Possessing Nourishment
- Author of Ayurveda texts
- Contributions to aeronautics (Vimana Shastra)
- Rigveda hymn composer

## The Sacred Significance of Seven

In Sandhyavandana, practitioners invoke three sets of seven:
- **Seven Rishis** (head) - Higher consciousness
- **Seven Chandas** (mouth) - Sacred sound
- **Seven Devas** (heart) - Cosmic forces`
      },
      {
        id: 'sutras',
        name: 'The Sutras',
        sanskrit: 'सूत्र',
        tagline: 'Ancient Manuals for Dharmic Living',
        description: 'The comprehensive manual systems that govern every aspect of Hindu life—from elaborate yajnas to daily domestic rituals, from sacred geometry to social laws.',
        keyBenefits: [
          'Complete life guidance',
          'Ritual precision',
          'Social harmony',
          'Mathematical foundation',
          'Legal principles',
          'Domestic wisdom'
        ],
        content: `## The Four Types of Sutras

### 1. Shrautasutra - Manuals for Large Yajnas
- Guidelines for elaborate Vedic rituals
- Detailed procedures for public ceremonies
- Rules for altar construction

### 2. Shulbasutra - Mathematics & Sacred Geometry
- Geometric principles for altar construction
- Sacred mathematics and measurements
- Foundation of Indian mathematics

### 3. Grihyasutra - Domestic Rituals
- Life-cycle ceremonies (samskaras)
- Daily household rituals
- Family traditions

### 4. Dharmasutra - Laws and Customs
- Social conduct and ethics
- Legal principles
- Rights and duties

## The Apastamba Sutra

Among all Sutra collections, Apastamba is unique in containing all four types—a complete 30-book guide for life:

- **24 books** - Shrauta Sutras
- **1 book** - Ritual Mantras
- **2 books** - Grihya Sutras
- **1 book** - Shulba Sutra
- **2 books** - Dharma Sutra

## Sutras by Veda

| Veda | School | Shrautasutra | Grihyasutra | Dharmasutra |
|------|--------|--------------|-------------|-------------|
| Rigveda | Shakala | Ashvalayana | Ashvalayana | - |
| Samaveda | Kauthuma | Latyayana | Gobhila | Gautama |
| Yajurveda | Taittiriya | Apastamba | Apastamba | Apastamba |
| Atharvaveda | Shaunaka | Vaitana | Kaushika | - |`
      },
      {
        id: 'bhagavad-gita',
        name: 'Bhagavad Gita Lessons',
        sanskrit: 'भगवद्गीता',
        tagline: '10 Life Lessons from the Ancient Epic',
        description: 'Practical wisdom from Krishna\'s teachings to Arjuna on the battlefield—timeless guidance for navigating life\'s challenges with clarity and purpose.',
        keyBenefits: [
          'Decision-making clarity',
          'Duty understanding',
          'Emotional balance',
          'Action without attachment',
          'Self-knowledge',
          'Purpose discovery'
        ],
        content: `## 10 Life Lessons from the Bhagavad Gita

### 1. Do Your Duty Without Attachment to Results
*"Karmanye vadhikaraste ma phaleshu kadachana"*
Focus on the action, not the outcome. Excellence comes from process, not obsession with results.

### 2. Change Is the Only Constant
*"Vasamsi jirnani yatha vihaya"*
Just as we discard worn clothes for new ones, the soul discards bodies. Embrace change.

### 3. Control Your Mind
*"Mana eva manushyanam karanam bandha mokshayoho"*
The mind is both the cause of bondage and liberation. Master it.

### 4. You Are Not the Body
*"Nainam chindanti shastrani"*
The eternal self cannot be cut, burned, or destroyed. Don't over-identify with the physical.

### 5. Equanimity in Success and Failure
*"Samatvam yoga uchyate"*
Yoga is balance. Remain steady whether praised or criticized, successful or failing.

### 6. Three Paths to the Divine
- **Jnana Yoga** - Path of knowledge
- **Bhakti Yoga** - Path of devotion
- **Karma Yoga** - Path of action

### 7. The Divine Is in Everything
*"Ishvarah sarva-bhutanam"*
See the divine in all beings. This transforms how you treat others.

### 8. Anger Clouds Judgment
*"Krodhad bhavati sammohah"*
Anger leads to delusion, then memory loss, then destruction of intelligence.

### 9. Faith Shapes Reality
*"Shraddhaval labhate jnanam"*
Your beliefs create your experience. Choose them wisely.

### 10. Surrender and Act
*"Sarva-dharman parityajya"*
Let go of anxiety about outcomes. Do your best and surrender the rest.`
      }
    ]
  }
]

// Helper functions
export function getAllPracticeCategories(): PracticeCategory[] {
  return PRACTICE_CATEGORIES
}

export function getPracticeCategory(categoryId: string): PracticeCategory | undefined {
  return PRACTICE_CATEGORIES.find(c => c.id === categoryId)
}

export function getPractice(practiceId: string): { practice: Practice; category: PracticeCategory } | undefined {
  for (const category of PRACTICE_CATEGORIES) {
    const practice = category.practices.find(p => p.id === practiceId)
    if (practice) {
      return { practice, category }
    }
  }
  return undefined
}

export function getAllPractices(): Array<{ practice: Practice; category: PracticeCategory }> {
  const result: Array<{ practice: Practice; category: PracticeCategory }> = []
  for (const category of PRACTICE_CATEGORIES) {
    for (const practice of category.practices) {
      result.push({ practice, category })
    }
  }
  return result
}
