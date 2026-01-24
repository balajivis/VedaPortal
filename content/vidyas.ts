export interface Vidya {
  id: string
  name: string
  sanskrit: string
  description: string
  fullDescription: string
  keyTopics: string[]
  sources: string[]
  relatedTo: string[]
}

export interface Category {
  id: string
  name: string
  sanskrit: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  hoverBg: string
  icon: string
  items: Vidya[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'vedas',
    name: 'Core Sacred Texts',
    sanskrit: 'चतुर्वेद',
    description: 'The Four Vedas — the foundational scriptures of Sanatan Dharma, revealed knowledge (śruti) transmitted through oral tradition for millennia',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/50',
    borderColor: 'border-amber-500/50',
    hoverBg: 'hover:bg-amber-950/70',
    icon: '📜',
    items: [
      {
        id: 'rigveda',
        name: 'Rigveda',
        sanskrit: 'ऋग्वेद',
        description: 'The Veda of Verses — the oldest and most sacred',
        fullDescription: 'The Rigveda is the oldest of the four Vedas, containing 1,028 hymns (suktas) organized into 10 books (mandalas). These hymns are primarily praises to the cosmic forces and deities, composed by ancient rishis who "saw" the eternal truths. The Rigveda establishes the foundation of Vedic thought, introducing concepts like Rta (cosmic order), the nature of existence, and the relationship between humans and the divine.',
        keyTopics: ['Hymns to Devas', 'Cosmic Order (Rta)', 'Creation Hymns', 'Philosophical Dialogues', 'Soma Rituals'],
        sources: ['Nasadiya Sukta', 'Purusha Sukta', 'Gayatri Mantra', 'Shakala Shakha'],
        relatedTo: ['samaveda', 'shiksha', 'chandas']
      },
      {
        id: 'samaveda',
        name: 'Samaveda',
        sanskrit: 'सामवेद',
        description: 'The Veda of Melodies — sacred chants and musical notation',
        fullDescription: 'The Samaveda is the "Veda of Songs" — a liturgical collection that sets Rigvedic verses to musical notation. It contains 1,549 verses, most derived from the Rigveda but arranged for singing during Soma sacrifices. The Samaveda is the origin of Indian classical music, introducing the concept of the seven notes (sapta svara). It demonstrates that spiritual knowledge can be transmitted through sound and melody.',
        keyTopics: ['Musical Notation', 'Ritual Chanting', 'Soma Ritual Songs', 'Seven Musical Notes', 'Udgata Priest Traditions'],
        sources: ['Jaiminiya Samhita', 'Kauthuma Samhita', 'Ranayaniya Samhita'],
        relatedTo: ['rigveda', 'gandharvaveda', 'chandas']
      },
      {
        id: 'yajurveda',
        name: 'Yajurveda',
        sanskrit: 'यजुर्वेद',
        description: 'The Veda of Rituals — prose mantras and ceremonial instructions',
        fullDescription: 'The Yajurveda is the "Veda of Ritual Formulas" — containing prose mantras (yajus) used by the Adhvaryu priest during sacrificial ceremonies. It exists in two recensions: Shukla (White) Yajurveda with mantras only, and Krishna (Black) Yajurveda with mantras and explanatory prose interwoven. The Yajurveda provides the practical framework for Vedic rituals, making it essential for understanding yajna (sacrifice) culture.',
        keyTopics: ['Ritual Procedures', 'Sacrificial Formulas', 'Priestly Duties', 'Sacred Actions', 'Yajna Instructions'],
        sources: ['Vajasaneyi Samhita (Shukla)', 'Taittiriya Samhita (Krishna)', 'Kathaka Samhita', 'Maitrayani Samhita'],
        relatedTo: ['kalpa', 'mimamsa', 'dhanurveda']
      },
      {
        id: 'atharvaveda',
        name: 'Atharvaveda',
        sanskrit: 'अथर्ववेद',
        description: 'The Veda of Everyday Life — practical wisdom and philosophy',
        fullDescription: 'The Atharvaveda is the "Veda of the Atharvans" — containing hymns dealing with everyday concerns: healing, protection, love, prosperity, and philosophical speculation. Unlike the other three Vedas focused on sacrifice, the Atharvaveda addresses practical life. It contains the Prithvi Sukta (hymn to Earth), early medical knowledge that evolved into Ayurveda, and profound philosophical hymns. It represents the integration of popular religion with Vedic tradition.',
        keyTopics: ['Healing Mantras', 'Daily Life Rituals', 'Philosophical Hymns', 'Protection Charms', 'Marriage & Domestic Rites'],
        sources: ['Shaunakiya Samhita', 'Paippalada Samhita', 'Prithvi Sukta', 'Mundaka Upanishad'],
        relatedTo: ['ayurveda', 'arthashastra', 'kalpa']
      }
    ]
  },
  {
    id: 'vedangas',
    name: 'Vedic Disciplines',
    sanskrit: 'वेदाङ्ग',
    description: 'The Six Limbs of the Vedas — auxiliary sciences necessary for proper understanding and preservation of Vedic knowledge',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/50',
    borderColor: 'border-emerald-500/50',
    hoverBg: 'hover:bg-emerald-950/70',
    icon: '🔤',
    items: [
      {
        id: 'shiksha',
        name: 'Shiksha',
        sanskrit: 'शिक्षा',
        description: 'Phonetics — the science of proper pronunciation',
        fullDescription: 'Shiksha is the science of phonetics and pronunciation — essential for the accurate recitation of Vedic mantras. The power of mantras depends on correct pronunciation of each syllable, including proper accent (svara), duration (matra), and articulation (varna). Shiksha texts describe the organs of speech, classify sounds, and explain sandhi (sound combination) rules. Without Shiksha, the oral transmission of the Vedas would have been impossible.',
        keyTopics: ['Phonemes (Varna)', 'Accent (Svara)', 'Articulation Points', 'Sandhi Rules', 'Oral Transmission'],
        sources: ['Paniniya Shiksha', 'Pratishakhyas', 'Naradiya Shiksha'],
        relatedTo: ['rigveda', 'vyakarana', 'chandas']
      },
      {
        id: 'vyakarana',
        name: 'Vyakarana',
        sanskrit: 'व्याकरण',
        description: 'Grammar — systematic analysis of Sanskrit language',
        fullDescription: 'Vyakarana is the science of grammar — the systematic analysis of Sanskrit language structure. Panini\'s Ashtadhyayi (Eight Chapters) is the crown jewel of this tradition, containing 3,959 sutras that describe Sanskrit with mathematical precision. Vyakarana is considered the most important Vedanga because it enables the understanding of all other texts. The tradition includes Patanjali\'s Mahabhashya and later works by Katyayana, forming a complete linguistic science.',
        keyTopics: ['Ashtadhyayi', 'Sutras', 'Word Formation', 'Syntax', 'Dhatu (Verbal Roots)'],
        sources: ['Panini\'s Ashtadhyayi', 'Patanjali\'s Mahabhashya', 'Katyayana\'s Varttikas'],
        relatedTo: ['nirukta', 'shiksha', 'mimamsa']
      },
      {
        id: 'chandas',
        name: 'Chandas',
        sanskrit: 'छन्दस्',
        description: 'Prosody — the science of Vedic meters',
        fullDescription: 'Chandas is the science of prosody — the study of Vedic meters and rhythmic patterns. The Vedic hymns are composed in specific meters (like Gayatri, Trishtubh, Jagati) with precise syllable counts and patterns. Pingala\'s Chandas Sutra is the foundational text, introducing binary notation concepts centuries before their appearance elsewhere. Understanding meters is essential for proper recitation and composition of sacred verses.',
        keyTopics: ['Gayatri Meter', 'Trishtubh', 'Jagati', 'Syllable Patterns', 'Binary Notation'],
        sources: ['Pingala\'s Chandas Sutra', 'Vedic Meters', 'Nidana Sutra'],
        relatedTo: ['rigveda', 'samaveda', 'shiksha']
      },
      {
        id: 'nirukta',
        name: 'Nirukta',
        sanskrit: 'निरुक्त',
        description: 'Etymology — explanation of difficult Vedic words',
        fullDescription: 'Nirukta is the science of etymology — explaining the meaning and derivation of difficult Vedic words. Yaska\'s Nirukta (c. 500 BCE) is the primary text, providing explanations for words in the Nighantu (Vedic glossary). Nirukta establishes principles of semantic analysis and demonstrates that Vedic words often have multiple layers of meaning. It bridges the gap between archaic Vedic language and classical Sanskrit.',
        keyTopics: ['Word Derivation', 'Vedic Vocabulary', 'Semantic Analysis', 'Mythological Etymology', 'Nighantu Glossary'],
        sources: ['Yaska\'s Nirukta', 'Nighantu', 'Durga\'s Commentary'],
        relatedTo: ['vyakarana', 'rigveda', 'mimamsa']
      },
      {
        id: 'jyotisha',
        name: 'Jyotisha',
        sanskrit: 'ज्योतिष',
        description: 'Astronomy — calculating auspicious times for rituals',
        fullDescription: 'Jyotisha is the science of astronomy and timekeeping — essential for determining the correct timing of Vedic rituals. The Vedanga Jyotisha (c. 1200 BCE) is the oldest known Indian astronomical text, providing methods to calculate the positions of the sun and moon. Later developments include the Surya Siddhanta and works by Aryabhata. Jyotisha ensures rituals are performed at astronomically auspicious moments (muhurta).',
        keyTopics: ['Calendar Systems', 'Muhurta', 'Nakshatra', 'Eclipse Calculation', 'Panchanga'],
        sources: ['Vedanga Jyotisha', 'Surya Siddhanta', 'Aryabhatiya'],
        relatedTo: ['kalpa', 'atharvaveda', 'gandharvaveda']
      },
      {
        id: 'kalpa',
        name: 'Kalpa',
        sanskrit: 'कल्प',
        description: 'Ritual Manual — procedures for Vedic ceremonies',
        fullDescription: 'Kalpa is the science of ritual procedure — providing detailed instructions for performing Vedic ceremonies. The Kalpa literature divides into four types: Shrauta Sutras (major sacrifices), Grihya Sutras (domestic rituals), Dharma Sutras (social and ethical codes), and Shulba Sutras (geometric principles for altar construction). Kalpa texts by Apastamba, Baudhayana, and others form the practical foundation for Vedic religious life.',
        keyTopics: ['Shrauta Sutras', 'Grihya Sutras', 'Dharma Sutras', 'Shulba Sutras', 'Samskara Rituals'],
        sources: ['Apastamba Sutras', 'Baudhayana Sutras', 'Ashvalayana Sutras', 'Katyayana Sutras'],
        relatedTo: ['yajurveda', 'dharmashastra', 'mimamsa']
      }
    ]
  },
  {
    id: 'upavedas',
    name: 'Applied Sciences',
    sanskrit: 'उपवेद',
    description: 'The Applied Vedas — practical sciences derived from Vedic knowledge for worldly welfare and advancement',
    color: 'text-sky-400',
    bgColor: 'bg-sky-950/50',
    borderColor: 'border-sky-500/50',
    hoverBg: 'hover:bg-sky-950/70',
    icon: '🔬',
    items: [
      {
        id: 'ayurveda',
        name: 'Ayurveda',
        sanskrit: 'आयुर्वेद',
        description: 'The Science of Life — traditional medicine and health',
        fullDescription: 'Ayurveda ("Science of Life") is the traditional Indian medical system, tracing its origins to the Atharvaveda. The Charaka Samhita (internal medicine) and Sushruta Samhita (surgery) are its foundational texts. Ayurveda is based on the theory of three doshas (Vata, Pitta, Kapha) and emphasizes preventive care, diet, lifestyle, and herbal treatments. It views health as harmony between body, mind, and spirit, anticipating modern holistic medicine by millennia.',
        keyTopics: ['Tridosha Theory', 'Herbal Medicine', 'Panchakarma', 'Preventive Care', 'Diet & Lifestyle'],
        sources: ['Charaka Samhita', 'Sushruta Samhita', 'Ashtanga Hridaya', 'Atharvaveda'],
        relatedTo: ['atharvaveda', 'nyaya', 'jyotisha']
      },
      {
        id: 'dhanurveda',
        name: 'Dhanurveda',
        sanskrit: 'धनुर्वेद',
        description: 'The Science of Warfare — martial arts and defense',
        fullDescription: 'Dhanurveda ("Science of Archery/Warfare") encompasses martial arts, military science, and defense strategies. Traditionally associated with the Yajurveda, it covers archery, weapons training, combat techniques, military formations, and the ethics of warfare (dharma yuddha). Texts like the Agni Purana and Nitisara contain Dhanurveda teachings. The tradition emphasizes that martial skills must be governed by dharmic principles.',
        keyTopics: ['Archery', 'Warfare Strategy', 'Weapon Science', 'Military Ethics', 'Combat Training'],
        sources: ['Agni Purana', 'Nitisara', 'Vishnu Dhanurveda', 'Yajurveda'],
        relatedTo: ['yajurveda', 'arthashastra', 'dharmashastra']
      },
      {
        id: 'gandharvaveda',
        name: 'Gandharvaveda',
        sanskrit: 'गान्धर्ववेद',
        description: 'The Science of Arts — music, dance, and aesthetics',
        fullDescription: 'Gandharvaveda is the science of performing arts — music, dance, drama, and aesthetic theory. Derived from the Samaveda\'s musical tradition, it reached its fullest expression in Bharata\'s Natyashastra, the comprehensive treatise on dramaturgy. The tradition includes raga (melodic frameworks), tala (rhythmic cycles), and rasa (aesthetic emotions). Gandharvaveda demonstrates that artistic expression is a path to spiritual realization.',
        keyTopics: ['Ragas', 'Talas', 'Natya (Drama)', 'Rasa Theory', 'Sangita (Music)'],
        sources: ['Natyashastra', 'Sangita Ratnakara', 'Dattilam', 'Samaveda'],
        relatedTo: ['samaveda', 'chandas', 'nyaya']
      },
      {
        id: 'arthashastra',
        name: 'Arthashastra',
        sanskrit: 'अर्थशास्त्र',
        description: 'The Science of Governance — statecraft and economics',
        fullDescription: 'Arthashastra ("Science of Wealth/Statecraft") covers governance, economics, diplomacy, and administration. Kautilya\'s Arthashastra (c. 300 BCE) is the magnum opus — a comprehensive manual on running a state. It addresses topics from taxation and treasury management to espionage and foreign policy. The Arthashastra represents the practical application of Vedic wisdom to political and economic life, balancing dharma with practical statecraft.',
        keyTopics: ['Statecraft', 'Economics', 'Diplomacy', 'Law & Justice', 'Administration'],
        sources: ['Kautilya\'s Arthashastra', 'Shukraniti', 'Kamandakiya Nitisara'],
        relatedTo: ['atharvaveda', 'dharmashastra', 'nyaya']
      }
    ]
  },
  {
    id: 'darshanas',
    name: 'Foundational Wisdom',
    sanskrit: 'दर्शन / पुराण',
    description: 'Philosophical schools and traditional lore — systematic frameworks for understanding reality, ethics, and liberation',
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/50',
    borderColor: 'border-purple-500/50',
    hoverBg: 'hover:bg-purple-950/70',
    icon: '🧘',
    items: [
      {
        id: 'purana',
        name: 'Purana',
        sanskrit: 'पुराण',
        description: 'Ancient Lore — mythology and cosmic history',
        fullDescription: 'The Puranas ("Ancient Stories") are encyclopedic texts containing mythology, cosmology, genealogies, and dharmic teachings. The 18 Mahapuranas (including Bhagavata, Vishnu, and Shiva Puranas) make Vedic wisdom accessible through narrative. They describe the creation and dissolution of the universe, the avatars of Vishnu, the lives of saints, and the geography of sacred places. Puranas democratized religious knowledge beyond the Brahmanical elite.',
        keyTopics: ['Creation Stories', 'Divine Genealogies', 'Pilgrimages (Tirtha)', 'Dharmic Stories', 'Cosmic Cycles'],
        sources: ['Bhagavata Purana', 'Vishnu Purana', 'Shiva Purana', 'Markandeya Purana'],
        relatedTo: ['rigveda', 'dharmashastra', 'mimamsa']
      },
      {
        id: 'nyaya',
        name: 'Nyaya',
        sanskrit: 'न्याय',
        description: 'Logic & Epistemology — valid knowledge and reasoning',
        fullDescription: 'Nyaya ("Logic") is the school of epistemology and logical analysis founded by Gautama (Akshapada). The Nyaya Sutras establish four valid means of knowledge (pramanas): perception, inference, comparison, and testimony. The school developed sophisticated theories of logical inference (anumana), including the five-membered syllogism. Nyaya methodology underlies all Indian philosophical debate and provides tools for distinguishing valid from invalid knowledge.',
        keyTopics: ['Pramanas (Valid Knowledge)', 'Syllogism', 'Debate Methods', 'Categories of Reality', 'Logical Fallacies'],
        sources: ['Nyaya Sutras', 'Vatsyayana\'s Bhashya', 'Nyaya-Vaisheshika Texts'],
        relatedTo: ['vyakarana', 'mimamsa', 'arthashastra']
      },
      {
        id: 'mimamsa',
        name: 'Mimamsa',
        sanskrit: 'मीमांसा',
        description: 'Vedic Hermeneutics — interpretation and dharma',
        fullDescription: 'Mimamsa ("Inquiry/Interpretation") is the school dedicated to interpreting Vedic texts and understanding dharma. Purva Mimamsa (founded by Jaimini) focuses on Vedic ritual and duty, while Uttara Mimamsa (Vedanta) addresses philosophical questions. Mimamsa developed sophisticated hermeneutical principles for textual interpretation that influenced all Indian jurisprudence. It establishes that the Vedas are authoritative, eternal, and self-validating.',
        keyTopics: ['Vedic Interpretation', 'Dharma Theory', 'Ritual Philosophy', 'Language Theory', 'Textual Hermeneutics'],
        sources: ['Jaimini Sutras', 'Shabara Bhashya', 'Kumarila\'s Works', 'Prabhakara\'s Works'],
        relatedTo: ['kalpa', 'vyakarana', 'dharmashastra']
      },
      {
        id: 'dharmashastra',
        name: 'Dharmashastra',
        sanskrit: 'धर्मशास्त्र',
        description: 'Law & Ethics — codes of righteous conduct',
        fullDescription: 'Dharmashastra ("Science of Dharma") comprises texts on law, ethics, and social organization. Building on the Dharma Sutras of the Kalpa tradition, works like Manusmriti and Yajnavalkya Smriti codify rules for individual conduct, family life, caste duties, kingship, and legal procedures. Dharmashastra adapts eternal Vedic principles to changing social conditions, providing a framework for righteous living across all stages (ashramas) of life.',
        keyTopics: ['Varnashrama Dharma', 'Samskaras', 'Raja Dharma', 'Personal Ethics', 'Legal Procedures'],
        sources: ['Manusmriti', 'Yajnavalkya Smriti', 'Narada Smriti', 'Dharma Sutras'],
        relatedTo: ['kalpa', 'arthashastra', 'purana']
      }
    ]
  }
]

// Helper functions
export function getAllCategories(): Category[] {
  return CATEGORIES
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getVidya(id: string): { vidya: Vidya; category: Category } | undefined {
  for (const category of CATEGORIES) {
    const vidya = category.items.find(v => v.id === id)
    if (vidya) {
      return { vidya, category }
    }
  }
  return undefined
}

export function getAllVidyas(): Array<{ vidya: Vidya; category: Category }> {
  return CATEGORIES.flatMap(category =>
    category.items.map(vidya => ({ vidya, category }))
  )
}

export function getRelatedVidyas(id: string): Array<{ vidya: Vidya; category: Category }> {
  const current = getVidya(id)
  if (!current) return []

  return current.vidya.relatedTo
    .map(relId => getVidya(relId))
    .filter((v): v is { vidya: Vidya; category: Category } => v !== undefined)
}
