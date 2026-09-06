import type { RouteFaq } from '@/types';

/**
 * Route FAQs. These feed both the on-page accordion and FAQPage structured
 * data, so every answer must be factually true against the route's `services`
 * in data/routes.ts — a wrong answer here can surface directly in Google.
 */
export const ROUTE_FAQS: Record<string, RouteFaq[]> = {
  'delhi-to-lucknow': [
    {
      question: 'What time does the Delhi to Lucknow bus leave?',
      answer: 'Six coaches leave every night. The Delhi-Lucknow 101 goes first at 9:30 PM, then the 104 at 10:30 PM, the 106 at 11:00 PM, the 105 at 11:15 PM, the 108 at 11:30 PM and the 111 at 11:50 PM.',
    },
    {
      question: 'How long is the bus journey from Delhi to Lucknow?',
      answer: 'Most coaches take 8 hours flat for the 490 km, so the 104 leaving at 10:30 PM reaches Lucknow at 6:30 AM. The fastest is the 108, which departs 11:30 PM and gets in at 6:30 AM in 7 hours.',
    },
    {
      question: 'Which is the cheapest Delhi to Lucknow bus?',
      answer: 'The lowest berth is ₹699, on the 104 at 10:30 PM and the 105 at 11:15 PM, both Bharat Benz Semi Sleeper/Sleeper AC (2+1). Business Class costs more, from ₹1999 on the 111 and ₹4999 on the 106.',
    },
    {
      question: 'Can I board at Anand Vihar instead of Kashmiri Gate?',
      answer: 'Yes. On the 9:30 PM departure the coach calls at Mori Gate Office at 9:30 PM and ISBT Kashmiri Gate at 9:40 PM, then Anand Vihar at 10:10 PM, Akshardham at 10:25 PM and Sarai Kale Khan at 10:45 PM.',
    },
    {
      question: 'Where does the bus drop in Lucknow?',
      answer: 'Drops are Alambagh Office near Nehariya Chauraha, Charbagh opposite the railway station, then Kamta and Polytechnic Chauraha on Faizabad Road. The 9:30 PM 101 reaches Alambagh at 5:30 AM.',
    },
    {
      question: 'Is there a washroom stop on the way to Lucknow?',
      answer: 'Yes, one 20-minute tea and washroom halt at around 2 AM. The rest of the run is access-controlled expressway, the Yamuna Expressway to Agra and then the Agra-Lucknow Expressway, so arrival times hold up well.',
    },
  ],
  'lucknow-to-delhi': [
    {
      question: 'What time is the last bus from Lucknow to Delhi?',
      answer: 'The later of the two nightly coaches is the Lucknow-Delhi 108 at 10:45 PM, a Bharat Benz Business Class Sleeper/Seater AC reaching Delhi at 6:15 AM. Before it, the 107 leaves at 10:00 PM and arrives 6:00 AM.',
    },
    {
      question: 'How many hours does Lucknow to Delhi take by bus?',
      answer: 'The 107 covers the 490 km in 8 hours, 10:00 PM to 6:00 AM. The 108 is half an hour quicker at 7 hours 30 minutes, running the Agra-Lucknow Expressway and then the Yamuna Expressway.',
    },
    {
      question: 'What is the cheapest fare from Lucknow to Delhi?',
      answer: '₹699 on the 107, the Bharat Benz Semi Sleeper/Sleeper AC (2+1) leaving at 10:00 PM. The 108 Business Class Sleeper/Seater at 10:45 PM starts at ₹2699 and gives you a wider berth and a faster run.',
    },
    {
      question: 'Where can I board in Lucknow?',
      answer: 'The 10:00 PM 107 picks up at Polytechnic Chauraha at 10:00 PM, Kamta at 10:10 PM, Charbagh opposite the railway station at 10:40 PM, and finally Alambagh Office near Avadh Hospital at 10:55 PM.',
    },
    {
      question: 'Which Delhi stop should I get down at?',
      answer: 'The coach drops at Sarai Kale Khan around 6:00 AM, then Akshardham, Anand Vihar, ISBT Kashmiri Gate and Mori Gate Office. Pick the point nearest your destination rather than riding on to the end.',
    },
    {
      question: 'Will I make a flight from Delhi airport the same morning?',
      answer: 'The 6:00 AM drop at Sarai Kale Khan is roughly 45 minutes from IGI by cab at that hour, so a mid-morning flight is comfortable. The 108 lands 15 minutes later, at 6:15 AM.',
    },
  ],
  'delhi-to-varanasi': [
    {
      question: 'What time does the Delhi to Varanasi bus leave?',
      answer: 'One coach runs nightly, the Delhi-Varanasi 103, leaving at 9:00 PM and reaching Varanasi at 11:25 AM the next day. It is a Bharat Benz Semi Sleeper/Sleeper AC (2+1), so one side of the aisle is single berths.',
    },
    {
      question: 'How long does the bus take from Delhi to Varanasi?',
      answer: '14 hours 25 minutes for 820 km. Almost all of it is expressway, the Yamuna Expressway to Agra, the Agra-Lucknow Expressway across the state and the Purvanchal Expressway from Lucknow, which keeps arrival predictable.',
    },
    {
      question: 'What is the fare for Delhi to Varanasi by bus?',
      answer: 'Fares start at ₹599 for a berth on the 103. It is the only coach on this pair, so there is no choice of service to make; book early if you want a lower berth on a run of this length.',
    },
    {
      question: 'Where does the Varanasi bus pick up in Delhi?',
      answer: 'Mori Gate Office at 9:00 PM, ISBT Kashmiri Gate at 9:10 PM, Anand Vihar at 9:40 PM, Akshardham at 9:55 PM and Sarai Kale Khan at 10:15 PM. Passengers from Noida and Ghaziabad should use Anand Vihar.',
    },
    {
      question: 'Which stop is closest to the ghats in Varanasi?',
      answer: 'Lanka, at the BHU main gate. The 103 sets down at Cantt railway station, Sigra near the stadium and Lanka, arriving in Varanasi at 11:25 AM. Lanka saves an auto ride back across the city to the ghats or BHU.',
    },
    {
      question: 'Are there halts on the Delhi to Varanasi run?',
      answer: 'There are two scheduled halts across the 14 hour 25 minute journey. On a night and morning this long the berth matters, and the 2+1 layout means solo travellers can take a single berth down one side.',
    },
  ],
  'varanasi-to-delhi': [
    {
      question: 'What time does the bus from Varanasi to Delhi start?',
      answer: 'The Varanasi-Delhi 101 leaves at 11:00 PM and reaches Delhi at about 1:00 PM the next day. It is a Bharat Benz Business Class Sleeper/Seater AC, with wider berths and reclining seats in the same coach.',
    },
    {
      question: 'How many hours is Varanasi to Delhi by bus?',
      answer: '14 hours for 820 km, running the Purvanchal Expressway to Lucknow, the Agra-Lucknow Expressway to Agra and then the Yamuna Expressway into Delhi. Departure is 11:00 PM and arrival about 1:00 PM.',
    },
    {
      question: 'How much does the Varanasi to Delhi bus cost?',
      answer: 'Fares start at ₹599 on the 101, the only service on this pair. At that fare you still get the Business Class Sleeper/Seater coach rather than a plain seater, which counts on a 14-hour run.',
    },
    {
      question: 'Can I board at Lanka or only at Cantt station?',
      answer: 'Both. Boarding begins at Cantt railway station at 11:00 PM, then Sigra crossing at 11:15 PM and Lanka by the BHU main gate at 11:30 PM. Cantt suits anyone coming off an evening train.',
    },
    {
      question: 'Where does the bus drop in Delhi?',
      answer: 'At Sarai Kale Khan around 1:00 PM, then Akshardham, Anand Vihar, ISBT Kashmiri Gate and Mori Gate Office. Get down at the point closest to where you are actually going instead of riding to the last stop.',
    },
    {
      question: 'Can I attend Ganga Aarti before catching this bus?',
      answer: 'Yes. The 101 leaves Cantt at 11:00 PM, well after the evening Ganga Aarti finishes, so the whole evening in Varanasi stays free. Board at Lanka at 11:30 PM if you are coming from the ghats side.',
    },
  ],
  'delhi-to-indore': [
    {
      question: 'What time does the Delhi to Indore bus depart?',
      answer: 'One coach a night, the Delhi-Indore 102 (Via Kota), leaving at 10:15 PM and arriving in Indore at 11:45 AM. It is a Bharat Benz Semi Sleeper/Sleeper AC (2+1), with single berths down one side.',
    },
    {
      question: 'How long does the bus take from Delhi to Indore?',
      answer: '13 hours 30 minutes for 810 km on NH-48, through Jaipur and Kota. The Kota line is the longer one on a map but the better road, and it is what makes this schedule realistic.',
    },
    {
      question: 'What is the fare for the Delhi to Indore bus?',
      answer: 'Fares start at ₹999 for a berth on the 102, a Bharat Benz Semi Sleeper/Sleeper AC (2+1). It is the only coach on this pair, and the 2+1 layout gives solo travellers a single berth on one side.',
    },
    {
      question: 'Where does the Indore bus leave from in Delhi?',
      answer: 'Mori Gate Office at 10:15 PM and ISBT Kashmiri Gate at 10:25 PM, then Anand Vihar at 10:55 PM, Akshardham at 11:10 PM and Sarai Kale Khan at 11:30 PM. From South or West Delhi use Sarai Kale Khan.',
    },
    {
      question: 'Which stop should I get down at in Indore?',
      answer: 'The coach reaches Sarwate bus stand first, next to Indore Junction, then Bhawarkua square and Vijay Nagar on AB Road, with arrival at 11:45 AM. If you are heading up AB Road, stay on to Vijay Nagar.',
    },
    {
      question: 'Does the Delhi to Indore bus go via Gwalior or Kota?',
      answer: 'Via Kota. The 102 takes NH-48 through Jaipur and Kota and does not touch Gwalior, covering 810 km in 13 hours 30 minutes. The Kota road is longer on the map but better, so the timing holds.',
    },
  ],
  'indore-to-delhi': [
    {
      question: 'When does the Indore to Delhi bus leave?',
      answer: 'At 10:00 PM from Sarwate bus stand, on the Indore-Delhi 102 (Via Kota), reaching Delhi at about 11:30 AM. There is one departure a night, so book ahead for weekends and holidays.',
    },
    {
      question: 'How long is the Indore to Delhi bus journey?',
      answer: '13 hours 30 minutes for 810 km, back up NH-48 through Kota and Jaipur. The 10:00 PM departure puts you into Delhi at around 11:30 AM the next morning, on a Bharat Benz 2+1 AC sleeper.',
    },
    {
      question: 'What is the fare from Indore to Delhi?',
      answer: 'From ₹899, which is ₹100 under the ₹999 Delhi-to-Indore fare on the same Bharat Benz Semi Sleeper/Sleeper AC (2+1) coach. One side of the aisle is single berths, useful if you travel alone.',
    },
    {
      question: 'Can I board at Vijay Nagar instead of Sarwate?',
      answer: 'Yes. Sarwate bus stand at 10:00 PM is the first pick-up, then Bhawarkua at 10:20 PM and Vijay Nagar at 10:35 PM. Vijay Nagar is the easiest if you are coming from the eastern side of the city.',
    },
    {
      question: 'Where does the bus drop in Delhi?',
      answer: 'The 102 sets down at Sarai Kale Khan at about 11:30 AM, then Akshardham, Anand Vihar, ISBT Kashmiri Gate and Mori Gate Office by the metro gate. Get down at the point nearest your destination.',
    },
    {
      question: 'Can I catch a morning flight from Delhi after this bus?',
      answer: 'Not safely. Arrival is around 11:30 AM, which is comfortable for an afternoon connection but no use for a morning departure. If you fly out early, plan a night in Delhi rather than counting on this coach.',
    },
  ],
  'delhi-to-ujjain': [
    {
      question: 'What time does the Delhi to Ujjain bus leave?',
      answer: 'At 10:15 PM. Ujjain is served by the Delhi-Indore 102 (Via Kota), which sets down at Ujjain and carries on to Indore, reaching Nanakheda at about 10:15 AM the next morning.',
    },
    {
      question: 'How long does Delhi to Ujjain take by bus?',
      answer: '12 hours for 770 km on NH-48 via Jaipur and Kota. Leaving Delhi at 10:15 PM, the coach is in Ujjain by roughly 10:15 AM, which leaves the whole day free for Mahakaleshwar darshan.',
    },
    {
      question: 'How much is the Delhi to Ujjain bus ticket?',
      answer: 'Fares start at ₹999 on the Bharat Benz Semi Sleeper/Sleeper AC (2+1). Because it is a through coach to Indore rather than a service terminating at Ujjain, berths go several days ahead on festival dates.',
    },
    {
      question: 'Where do I board for Ujjain in Delhi?',
      answer: 'Mori Gate Office at 10:15 PM, ISBT Kashmiri Gate at 10:25 PM, Anand Vihar at 10:55 PM, Akshardham at 11:10 PM and Sarai Kale Khan at 11:30 PM. Board at the point nearest you rather than travelling to Mori Gate.',
    },
    {
      question: 'Where does the bus drop in Ujjain?',
      answer: 'At Nanakheda bus stand on Dewas Road and at Dewas Gate near Mahakal Road, arriving about 10:15 AM. Nanakheda is a short auto ride from Mahakaleshwar, and mid-morning leaves the full day for darshan.',
    },
    {
      question: 'Do I need to tell the crew I am getting off at Ujjain?',
      answer: 'Yes. This is a through service running on to Indore, so tell the crew at boarding that you alight at Ujjain and your luggage will be packed accessibly. Book early for Shravan Mondays and Nag Panchami.',
    },
  ],
  'ujjain-to-delhi': [
    {
      question: 'What time is the bus from Ujjain to Delhi?',
      answer: 'Boarding is at Nanakheda bus stand at about 10:00 PM on the Indore-Delhi 102 (Via Kota) as it passes through, with Dewas Gate at about 10:15 PM. It reaches Delhi at around 9:30 AM.',
    },
    {
      question: 'How long is Ujjain to Delhi by bus?',
      answer: '11 hours 30 minutes for 770 km on NH-48 through Kota and Jaipur. A 10:00 PM boarding at Nanakheda puts you in Delhi by about 9:30 AM, early enough to leave the working day intact.',
    },
    {
      question: 'What does the Ujjain to Delhi ticket cost?',
      answer: 'Fares start at ₹899 on the Bharat Benz Semi Sleeper/Sleeper AC (2+1). The coach arrives from Indore already part loaded, so the berth choice is smaller than on a route that starts here; book early for a lower berth.',
    },
    {
      question: 'Which boarding points are there in Ujjain?',
      answer: 'Two. Nanakheda bus stand on Dewas Road at about 10:00 PM, and Dewas Gate bus stand near Mahakal Road at about 10:15 PM. Nanakheda is the main pick-up for the Delhi coach.',
    },
    {
      question: 'Where does the Ujjain bus drop in Delhi?',
      answer: 'At Sarai Kale Khan at about 9:30 AM, then Akshardham, Anand Vihar, ISBT Kashmiri Gate and Mori Gate Office. A 9:30 AM arrival gives comfortable margin for an afternoon flight from IGI.',
    },
    {
      question: 'Is this a direct bus or does it come from Indore?',
      answer: 'It is the Indore-Delhi 102 passing through, so it reaches Nanakheda already carrying passengers from Indore. That is why lower berths go early on this route, and why booking a few days ahead gives you a better pick.',
    },
  ],
  'delhi-to-kanpur': [
    {
      question: 'What time do the Delhi to Kanpur buses leave?',
      answer: 'Two coaches a night. The Delhi-Kanpur 101 at 10:00 PM arrives 6:30 AM, and the Delhi-Kanpur 102 at 10:45 PM arrives 7:15 AM. Both take 8 hours 30 minutes for the 470 km.',
    },
    {
      question: 'How long does the Delhi to Kanpur bus take?',
      answer: '8 hours 30 minutes for 470 km, on the Yamuna Expressway and then NH-19 through Etawah. The 10:00 PM coach is in Kanpur at 6:30 AM and the 10:45 PM coach at 7:15 AM.',
    },
    {
      question: 'What is the lowest fare from Delhi to Kanpur?',
      answer: '₹500 on the 101, a Sleeper/Seater Non-AC (2+1) and the cheapest berth we run. The 102 at 10:45 PM is ₹749 for an Air Suspension Premium Sleeper AC, so the gap between them is ₹249.',
    },
    {
      question: 'Where does the Kanpur bus pick up in Delhi?',
      answer: 'The 10:00 PM 101 boards at Mori Gate Office at 10:00 PM and ISBT Kashmiri Gate at 10:10 PM, then Anand Vihar at 10:40 PM, Akshardham at 10:55 PM and Sarai Kale Khan at 11:15 PM.',
    },
    {
      question: 'Which drop is closest to IIT Kanpur?',
      answer: 'Kalyanpur, on the GT Road side. The coach reaches Jhakarkati bus stand first, then Rawatpur and Kalyanpur, so stay on past Jhakarkati if you are headed for IIT or the northern suburbs.',
    },
    {
      question: 'Should I take the Non-AC or the AC bus to Kanpur?',
      answer: 'In winter the ₹500 Non-AC 101 is perfectly comfortable. In May and June the ₹749 Air Suspension Premium Sleeper AC 102 is worth the difference, mostly for the NH-19 stretch, which is ordinary highway rather than expressway.',
    },
  ],
  'kanpur-to-delhi': [
    {
      question: 'What time does the Kanpur to Delhi bus leave?',
      answer: 'One coach a night, the Kanpur-Delhi 102, leaving Jhakarkati bus stand at 10:30 PM and reaching Delhi at 6:30 AM. It is an Air Suspension Hi-tech Sleeper AC covering 470 km.',
    },
    {
      question: 'How many hours is Kanpur to Delhi by bus?',
      answer: '8 hours for 470 km, on NH-19 through Etawah and then the Yamuna Expressway. Leaving at 10:30 PM, the coach is in Delhi at 6:30 AM, early enough for a morning flight with sensible margin.',
    },
    {
      question: 'What is the fare from Kanpur to Delhi?',
      answer: 'Fares start at ₹799 on the 102, an Air Suspension Hi-tech Sleeper AC. There is no Non-AC option in this direction, unlike Delhi to Kanpur where a ₹500 Non-AC coach also runs each night.',
    },
    {
      question: 'Can I board at Kalyanpur instead of Jhakarkati?',
      answer: 'Yes. Jhakarkati bus stand is the first pick-up at 10:30 PM, then Rawatpur at 10:50 PM and Kalyanpur at 11:00 PM, both on GT Road. Passengers from IIT and the northern side need not come into the centre.',
    },
    {
      question: 'Where does the Kanpur bus drop in Delhi?',
      answer: 'Sarai Kale Khan at about 6:30 AM, then Akshardham, Anand Vihar, ISBT Kashmiri Gate and Mori Gate Office opposite the metro gate. Sarai Kale Khan is the useful one for an onward cab to the airport.',
    },
    {
      question: 'Is the ride rough on the Kanpur to Delhi route?',
      answer: 'The 102 runs an air-suspension chassis, which matters more here than on the expressway corridors, because the NH-19 stretch out of Kanpur is ordinary highway. Over 8 hours the difference in ride quality is easy to feel.',
    },
  ],
  'delhi-to-agra': [
    {
      question: 'What time does the Delhi to Agra bus leave?',
      answer: 'Three through coaches leave between 9:30 PM and 10:45 PM: the Delhi-Lucknow 101 and the Delhi-Chhatarpur 102, both at 9:30 PM, and the Delhi-Kanpur 102 at 10:45 PM. All three set down at Agra on the way.',
    },
    {
      question: 'How long is the Delhi to Agra bus journey?',
      answer: 'Three to three and a half hours for 230 km, all on the Yamuna Expressway. The Delhi-Lucknow 101 does it in 3 hours 15 minutes, while the Chhatarpur 102 and the Kanpur 102 take 3 hours 30 minutes.',
    },
    {
      question: 'What is the fare for Delhi to Agra by bus?',
      answer: '₹599 on the Delhi-Lucknow 101 and the Delhi-Chhatarpur 102, both leaving at 9:30 PM. The Delhi-Kanpur 102 at 10:45 PM is ₹749 and runs an Air Suspension Premium Sleeper AC coach.',
    },
    {
      question: 'Where do the Agra buses pick up in Delhi?',
      answer: 'For the 9:30 PM departures: Mori Gate Office at 9:30 PM, ISBT Kashmiri Gate at 9:40 PM, Anand Vihar at 10:10 PM, Akshardham at 10:25 PM and Sarai Kale Khan at 10:45 PM on the Ring Road.',
    },
    {
      question: 'Where does the bus drop in Agra?',
      answer: 'At Agra Cantt near the railway station, then Bhagwan Talkies crossing on NH-19 and Sikandra on the bypass. Agra Cantt suits anyone continuing by train or taking a cab into the city.',
    },
    {
      question: 'What time does the Delhi bus reach Agra at night?',
      answer: 'Between 12:45 AM and 2:15 AM, because these are night services running on to Lucknow, Kanpur and Chhatarpur. That suits a sunrise visit to the Taj Mahal without a hotel night, but not a normal daytime arrival.',
    },
  ],
  'delhi-to-chhatarpur': [
    {
      question: 'What time does the Delhi to Chhatarpur bus leave?',
      answer: 'Two coaches a night. The Delhi-Chhatarpur 102 leaves at 9:30 PM and arrives 7:35 AM, and the 105 leaves at 10:40 PM and arrives 9:00 AM. Both are Bharat Benz Business Class coaches.',
    },
    {
      question: 'How long does Delhi to Chhatarpur take?',
      answer: 'About ten hours for 590 km: 10 hours 5 minutes on the 102 and 10 hours 20 minutes on the 105. The route runs down the Yamuna Expressway and then NH-44 through Gwalior into Bundelkhand.',
    },
    {
      question: 'What is the fare, and which of the two coaches is better?',
      answer: 'Fares start at ₹599 on the 102, a Business Class Sleeper/Seater. The 105 starts at ₹2599 and is a full Business Class Sleeper (2+1), so every passenger gets a berth, which is worth considering on a ten-hour run.',
    },
    {
      question: 'Where does the Chhatarpur bus board in Delhi?',
      answer: 'The 9:30 PM 102 picks up at Mori Gate Office at 9:30 PM, ISBT Kashmiri Gate at 9:40 PM, Anand Vihar at 10:10 PM, Akshardham at 10:25 PM and Sarai Kale Khan at 10:45 PM.',
    },
    {
      question: 'Where does the bus stop in Chhatarpur?',
      answer: 'There are two drops, the main Chhatarpur bus stand and Panna Naka crossing. The 102 gets in at 7:35 AM and the 105 at 9:00 AM, both early enough to move on the same morning.',
    },
    {
      question: 'Can I reach Khajuraho on this bus?',
      answer: 'Chhatarpur is the practical base for Khajuraho, roughly 45 km further on. The 7:35 AM and 9:00 AM arrivals are timed so you can reach the temples the same day instead of losing one to travel.',
    },
  ],
};
