export interface MantraLesson {
  id: string;
  day: number;
  title: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  lesson: string;
  durationSeconds: number;
}

export const DAILY_MANTRAS: MantraLesson[] = [
  {
    id: "day-1-gayatri",
    day: 1,
    title: "The Gayatri Mantra",
    sanskrit:
      "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    transliteration:
      "Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt",
    meaning:
      "We meditate on the transcendental glory of the supreme deity, whose divine light illuminates all realms. May that light inspire and guide our intellect.",
    lesson:
      "True clarity doesn't come from overthinking, but from illuminating the mind. Focus on clearing mental fog and letting pure intellect guide your decisions. Sit in stillness, chant, and let external noise fade.",
    durationSeconds: 120,
  },
  {
    id: "day-2-pavamana",
    day: 2,
    title: "The Pavamana Mantra",
    sanskrit: "असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥",
    transliteration:
      "Asato mā sadgamaya, tamaso mā jyotirgamaya, mṛtyormā amṛtaṃ gamaya",
    meaning:
      "Lead me from the unreal to the real, lead me from darkness to light, lead me from death to immortality.",
    lesson:
      "We often attach ourselves to things that do not last. This mantra is a reminder to seek permanent truth over temporary anxieties. Dedicate these two minutes to letting go of a temporary worry.",
    durationSeconds: 120,
  },
  {
    id: "day-3-shanti",
    day: 3,
    title: "Saha Navavatu",
    sanskrit: "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ॥",
    transliteration:
      "Oṃ saha nāvavatu, saha nau bhunaktu, saha vīryaṃ karavāvahai",
    meaning:
      "May the divine protect us both (teacher and student). May it nourish us. May we work together with great energy.",
    lesson:
      "Spiritual growth is not a solitary race; it is a shared journey. This practice is about dissolving the ego. Set an intention to approach everyone you meet today as both a teacher and a student.",
    durationSeconds: 120,
  },
  {
    id: "day-4-mrityunjaya",
    day: 4,
    title: "Maha Mrityunjaya Mantra",
    sanskrit:
      "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥",
    transliteration:
      "Oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam, urvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
    meaning:
      "We worship the three-eyed one, fragrant and nourishing to all beings. Just as a ripe cucumber is severed from its bondage to the creeper, may we be liberated from death for the sake of immortality.",
    lesson:
      "This is the ultimate mantra of healing and liberation. It teaches us that true freedom comes not from fighting our circumstances, but from ripening into wisdom so we naturally detach from suffering.",
    durationSeconds: 120,
  },
  {
    id: "day-5-purnamadah",
    day: 5,
    title: "The Mantra of Wholeness",
    sanskrit:
      "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥",
    transliteration:
      "Oṃ pūrṇamadaḥ pūrṇamidaṃ pūrṇātpūrṇamudacyate, pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate",
    meaning:
      "That (the supreme) is complete; this (the universe) is complete. From completeness comes completeness. Even if completeness is taken from completeness, completeness remains.",
    lesson:
      "You are not broken, and you are not lacking. You are inherently whole. Use these two minutes to stop trying to 'fix' yourself, and simply rest in the knowledge that you are already complete.",
    durationSeconds: 120,
  },
  {
    id: "day-6-ganesha",
    day: 6,
    title: "Vakratunda Mahakaya",
    sanskrit:
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    transliteration:
      "Vakratuṇḍa mahākāya sūryakoṭi samaprabha, nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā",
    meaning:
      "O Lord with a curved trunk and a massive body, whose brilliance equals a million suns, please make all my endeavors free of obstacles, always.",
    lesson:
      "Before we tackle the complexities of life, we must invoke the energy of focus and obstacle removal. Surrender your current struggles and ask for the clarity to step forward unhindered.",
    durationSeconds: 120,
  },
  {
    id: "day-7-sarve",
    day: 7,
    title: "Universal Happiness",
    sanskrit:
      "ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥",
    transliteration:
      "Oṃ sarve bhavantu sukhinaḥ, sarve santu nirāmayāḥ, sarve bhadrāṇi paśyantu, mā kaścid duḥkhabhāgbhavet",
    meaning:
      "May all beings be happy, may all be free from illness. May all see what is auspicious, may no one suffer.",
    lesson:
      "True spirituality expands our circle of compassion. Today, dedicate your practice not for your own peace, but for the peace and healing of someone who has wronged you.",
    durationSeconds: 120,
  },
  {
    id: "day-8-tvameva",
    day: 8,
    title: "The Mantra of Surrender",
    sanskrit:
      "त्वमेव माता च पिता त्वमेव । त्वमेव बन्धुश्च सखा त्वमेव । त्वमेव विद्या द्रविणम् त्वमेव । त्वमेव सर्वम् मम देव देव ॥",
    transliteration:
      "Tvameva mātā ca pitā tvameva, tvameva bandhuśca sakhā tvameva, tvameva vidyā draviṇam tvameva, tvameva sarvam mama deva deva",
    meaning:
      "You alone are my mother and father. You alone are my relative and friend. You alone are my knowledge and wealth. You are my everything, O God of Gods.",
    lesson:
      "Anxiety often stems from feeling utterly alone. This verse reminds us that the universe supports us in every form. Rest in the feeling of being deeply held by existence.",
    durationSeconds: 120,
  },
  {
    id: "day-9-guru",
    day: 9,
    title: "Guru Stotram",
    sanskrit:
      "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥",
    transliteration:
      "Gurur brahmā gurur viṣṇuḥ, gurur devo maheśvaraḥ, guruḥ sākṣāt parabrahma, tasmai śrī gurave namaḥ",
    meaning:
      "The Guru is Brahma (creator), Vishnu (preserver), and Shiva (destroyer). The Guru is truly the supreme reality. I bow to that Guru.",
    lesson:
      "A 'Guru' removes darkness. This can be a person, a life experience, or your own inner voice. Bow to the lessons your current hardships are trying to teach you.",
    durationSeconds: 120,
  },
  {
    id: "day-10-shivaya",
    day: 10,
    title: "The Panchakshara Mantra",
    sanskrit: "ॐ नमः शिवाय",
    transliteration: "Oṃ Namaḥ Śivāya",
    meaning: "I bow to Shiva (the auspicious one, the inner self).",
    lesson:
      "This is the mantra of transformation and inner stillness. 'Shiva' translates to 'that which is not'—the silent emptiness of the universe. Spend two minutes doing nothing but being empty space.",
    durationSeconds: 120,
  },
  {
    id: "day-11-loka",
    day: 11,
    title: "Loka Samastha",
    sanskrit: "लोकाः समस्ताः सुखिनो भवन्तु",
    transliteration: "Lokāḥ samastāḥ sukhino bhavantu",
    meaning:
      "May all beings everywhere be happy and free, and may the thoughts, words, and actions of my own life contribute in some way to that happiness.",
    lesson:
      "Your inner work matters because it ripples outward. You cannot give peace to others if you are at war with yourself. Cultivate peace here, and let it overflow.",
    durationSeconds: 120,
  },
];
