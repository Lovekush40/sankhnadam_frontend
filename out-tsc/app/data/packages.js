import vrindavanImg from "@/assets/vrindavan-temple.jpg";
import barsanaImg from "@/assets/barsana.jpg";
import mathuraImg from "@/assets/mathura.jpg";
import govardhanImg from "@/assets/govardhan.jpg";
import nandgaonImg from "@/assets/nandgaon.jpg";
export const tourPackages = [
    {
        id: "vrindavan-divine",
        title: "Vrindavan Divine Darshan",
        location: "Vrindavan, Uttar Pradesh",
        duration: "3 Days / 2 Nights",
        price: 4999,
        originalPrice: 6999,
        image: vrindavanImg,
        shortDescription: "Experience the divine essence of Vrindavan with visits to Banke Bihari, ISKCON, Prem Mandir and more.",
        description: "Immerse yourself in the spiritual heart of Vrindavan, the land of Lord Krishna's childhood leelas. This carefully curated 3-day tour covers the most sacred temples, ghats and spiritual sites that make Vrindavan the holiest of holy cities in Braj Bhoomi.",
        highlights: [
            "Banke Bihari Temple darshan",
            "ISKCON Temple evening aarti",
            "Prem Mandir light & sound show",
            "Yamuna Ghat evening ceremony",
            "Seva Kunj & Nidhi Van visit",
            "Radha Raman Temple"
        ],
        itinerary: [
            { day: "Day 1", title: "Arrival & Temple Tour", details: "Arrive Vrindavan by 10 AM. Check-in to hotel. Visit Banke Bihari Temple, Radha Raman Temple, and Shahji Temple. Evening aarti at Yamuna Ghat." },
            { day: "Day 2", title: "Full Day Darshan", details: "Morning visit to ISKCON Temple, Rangaji Temple, Govind Dev Temple. Afternoon at Seva Kunj & Nidhi Van. Evening Prem Mandir light show." },
            { day: "Day 3", title: "Departure", details: "Early morning Yamuna snan. Visit Madan Mohan Temple. Breakfast and checkout by 11 AM." }
        ],
        inclusions: ["AC accommodation", "Vegetarian meals (breakfast & dinner)", "Local transport", "Tour guide", "Temple entry fees"],
        exclusions: ["Personal expenses", "Lunch", "Travel insurance", "Tips & gratuities"],
        policies: ["50% refund if cancelled 7 days before", "No refund within 3 days of departure", "ID proof mandatory", "Children below 5 travel free"],
        startDates: ["2026-04-10", "2026-04-18", "2026-05-02", "2026-05-16", "2026-06-01"],
        timing: "10:00 AM – Check-in | 11:00 AM – Tour begins",
        groupSize: "15-25 travellers"
    },
    {
        id: "barsana-radha",
        title: "Barsana – Land of Radha Rani",
        location: "Barsana, Uttar Pradesh",
        duration: "2 Days / 1 Night",
        price: 2999,
        originalPrice: 4499,
        image: barsanaImg,
        shortDescription: "Visit the sacred hilltop temple of Radha Rani and experience the vibrant culture of Barsana.",
        description: "Barsana is the birthplace of Radha Rani, the beloved consort of Lord Krishna. This two-day tour takes you through the magnificent hilltop Radha Rani Temple, the colourful lanes of Barsana, and the legendary sites where Radha and Krishna's eternal love story unfolded.",
        highlights: [
            "Radha Rani Temple hilltop darshan",
            "Pili Pokhar (sacred pond)",
            "Sankari Khor (narrow pass of leelas)",
            "Rangili Mahal",
            "Local Braj cuisine experience"
        ],
        itinerary: [
            { day: "Day 1", title: "Barsana Exploration", details: "Arrive by 9 AM. Climb to Radha Rani Temple for morning darshan. Visit Pili Pokhar and Sankari Khor. Evening cultural programme with local folk songs." },
            { day: "Day 2", title: "Heritage Walk & Departure", details: "Morning heritage walk through old Barsana lanes. Visit Rangili Mahal. Brunch and departure by 1 PM." }
        ],
        inclusions: ["Accommodation", "Meals (dinner & brunch)", "Local guide", "Transport from Mathura"],
        exclusions: ["Personal expenses", "Travel to Mathura", "Travel insurance"],
        policies: ["Full refund if cancelled 10 days before", "50% refund 5-10 days before", "ID proof required"],
        startDates: ["2026-04-12", "2026-04-26", "2026-05-10", "2026-05-24"],
        timing: "9:00 AM – Assembly at Mathura bus stand",
        groupSize: "10-20 travellers"
    },
    {
        id: "braj-84-kos",
        title: "Braj Bhoomi 84 Kos Parikrama",
        location: "Braj Region, UP",
        duration: "5 Days / 4 Nights",
        price: 8999,
        originalPrice: 12999,
        image: mathuraImg,
        shortDescription: "The complete Braj pilgrimage covering Mathura, Vrindavan, Barsana, Nandgaon, Govardhan and more.",
        description: "Embark on the sacred 84 Kos Parikrama of Braj Bhoomi — the complete spiritual circuit that covers every major site associated with Lord Krishna's divine leelas. From the birthplace in Mathura to the playgrounds of Vrindavan, the hills of Govardhan and the love lanes of Barsana.",
        highlights: [
            "Krishna Janmabhoomi, Mathura",
            "Complete Vrindavan temple circuit",
            "Govardhan Parikrama",
            "Barsana & Nandgaon darshan",
            "Radha Kund & Shyam Kund",
            "Kusum Sarovar sunset"
        ],
        itinerary: [
            { day: "Day 1", title: "Mathura", details: "Arrive Mathura. Visit Krishna Janmabhoomi, Dwarkadhish Temple, Vishram Ghat. Evening Yamuna aarti." },
            { day: "Day 2", title: "Vrindavan", details: "Full day in Vrindavan — Banke Bihari, ISKCON, Prem Mandir, Radha Raman, Seva Kunj." },
            { day: "Day 3", title: "Govardhan", details: "Govardhan Parikrama (21 km sacred walk or vehicle). Visit Radha Kund, Shyam Kund, Kusum Sarovar, Manasi Ganga." },
            { day: "Day 4", title: "Barsana & Nandgaon", details: "Morning at Barsana — Radha Rani Temple, Sankari Khor. Afternoon at Nandgaon — Nand Bhawan, Pavan Sarovar." },
            { day: "Day 5", title: "Departure", details: "Morning visit to Gokul & Mahavan. Brunch and departure by 2 PM." }
        ],
        inclusions: ["AC accommodation", "All meals (veg)", "AC vehicle transport", "Expert guide", "All entry fees", "Parikrama assistance"],
        exclusions: ["Personal expenses", "Travel insurance", "Donations", "Camera fees at select sites"],
        policies: ["Full refund 15 days before", "50% refund 7-14 days before", "No refund within 7 days", "Medical certificate needed for Govardhan walk"],
        startDates: ["2026-04-05", "2026-04-19", "2026-05-03", "2026-05-17", "2026-06-07"],
        timing: "8:00 AM – Reporting at Mathura Junction",
        groupSize: "20-30 travellers"
    },
    {
        id: "govardhan-parikrama",
        title: "Govardhan Parikrama Special",
        location: "Govardhan, Uttar Pradesh",
        duration: "2 Days / 1 Night",
        price: 3499,
        originalPrice: 4999,
        image: govardhanImg,
        shortDescription: "Sacred Govardhan Hill parikrama with visits to Radha Kund, Kusum Sarovar and Dan Ghati.",
        description: "Walk the sacred 21 km path around Govardhan Hill, the hill that Lord Krishna lifted on his little finger. This spiritual journey includes visits to the holiest kunds, sarovars and temples along the parikrama route.",
        highlights: [
            "21 km Govardhan Parikrama",
            "Radha Kund & Shyam Kund bath",
            "Kusum Sarovar",
            "Dan Ghati Temple",
            "Manasi Ganga darshan"
        ],
        itinerary: [
            { day: "Day 1", title: "Arrival & Parikrama", details: "Arrive Govardhan by 6 AM. Begin sacred parikrama. Visit Radha Kund, Shyam Kund, Kusum Sarovar along the way. Evening rest at dharamshala." },
            { day: "Day 2", title: "Temple Visits & Departure", details: "Morning visit Manasi Ganga, Dan Ghati Temple, Mukut Mukhar Vind. Brunch and departure by noon." }
        ],
        inclusions: ["Dharamshala accommodation", "Meals", "Parikrama guide", "First-aid support"],
        exclusions: ["Personal expenses", "Travel to Govardhan", "Travel insurance"],
        policies: ["Full refund 7 days before", "No refund within 3 days", "Comfortable walking shoes mandatory"],
        startDates: ["2026-04-08", "2026-04-22", "2026-05-06", "2026-05-20", "2026-06-03"],
        timing: "6:00 AM sharp – Assembly at Govardhan bus stand",
        groupSize: "15-25 travellers"
    },
    {
        id: "nandgaon-gokul",
        title: "Nandgaon & Gokul Leela Yatra",
        location: "Nandgaon & Gokul, UP",
        duration: "2 Days / 1 Night",
        price: 2799,
        originalPrice: 3999,
        image: nandgaonImg,
        shortDescription: "Explore Krishna's childhood villages — Nandgaon and Gokul — with their ancient temples and leela sthals.",
        description: "Travel to Nandgaon, where Nand Baba raised young Krishna, and Gokul, where the divine child performed his earliest miracles. These twin villages hold the most intimate memories of Krishna's childhood.",
        highlights: [
            "Nand Bhawan Temple",
            "Pavan Sarovar holy dip",
            "Gokul — Raman Reti",
            "Brahmand Ghat",
            "Chaurasi Khamba"
        ],
        itinerary: [
            { day: "Day 1", title: "Nandgaon", details: "Arrive by 9 AM. Visit Nand Bhawan, Nand Rai Temple, Pavan Sarovar. Evening bhajan session with local saints." },
            { day: "Day 2", title: "Gokul & Departure", details: "Morning drive to Gokul. Visit Raman Reti, Brahmand Ghat, Chaurasi Khamba. Lunch and departure by 2 PM." }
        ],
        inclusions: ["Accommodation", "Meals", "Transport between sites", "Local guide"],
        exclusions: ["Personal expenses", "Travel to Nandgaon", "Insurance"],
        policies: ["Full refund 7 days before", "50% refund 3-7 days", "No refund within 3 days"],
        startDates: ["2026-04-14", "2026-04-28", "2026-05-12", "2026-05-26"],
        timing: "9:00 AM – Assembly at Nandgaon temple gate",
        groupSize: "10-20 travellers"
    }
];
