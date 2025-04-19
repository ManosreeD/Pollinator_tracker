import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Search, ChevronDown } from "lucide-react";

export default function SpeciesGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSpecies, setActiveSpecies] = useState(null);

  const pollinatorSpecies = [
    {
      id: "bee-fly",
      name: "Bee fly",
      scientificName: "Bombyliidae",
      description: "Bee flies are a family of flies that mimic bees. They are important pollinators and typically have round, fuzzy bodies with long proboscises that they use to feed on nectar from flowers.",
      characteristics: [
        "Round, bee-like appearance",
        "Often covered in dense fur",
        "Long, thin proboscis for feeding on nectar",
        "Hover in flight like hummingbirds",
        "Usually have spotted or patterned wings"
      ],
      ecologicalRole: "Bee flies are important pollinators for wildflowers and some crops. Their larvae are often parasitic on other insects, which helps control pest populations.",
      conservation: "Populations are affected by habitat loss and pesticide use. Creating diverse wildflower habitats can support bee fly populations.",
      funFact: "Despite their bee-like appearance, bee flies are harmless and cannot sting. Their mimicry helps protect them from predators.",
      image: "https://imgs.search.brave.com/DYrUhypFEut1mqfxvGbg3Zoe5EXRnsFXeuIDHmfeILM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGFu/dHVyYS5nYXJkZW4v/dWsvd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzIvMjAyMS8w/Ni9iZWUtcG9sbGlu/YXRpbmctZmxvd2Vy/LTEwMjR4NjUzLmpw/Zz94NjM2NTc"
    },
    {
      id: "beetle",
      name: "Beetle",
      scientificName: "Coleoptera",
      description: "Beetles are the largest order of insects, with many species visiting flowers. They typically have hardened forewings (elytra) that protect their membranous hindwings when not in flight.",
      characteristics: [
        "Hardened forewings (elytra)",
        "Chewing mouthparts",
        "Complete metamorphosis life cycle",
        "Variable sizes and colors",
        "Six legs with claws"
      ],
      ecologicalRole: "Beetles were among the first insects to visit flowers, and are still important pollinators, especially for ancient plant lineages. Some beetles also serve as decomposers.",
      conservation: "Many beetle species are declining due to habitat loss and pesticide use. Preserving dead wood and diverse plant communities helps support beetle populations.",
      funFact: "Beetles represent about 40% of all described insect species and 25% of all known animal life forms on the planet.",
      image: "https://images.pexels.com/photos/31694589/pexels-photo-31694589/free-photo-of-close-up-of-a-ladybug-on-vibrant-pink-petals.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "bumble-bees",
      name: "Bumble bees",
      scientificName: "Bombus",
      description: "Bumble bees are large, fuzzy bees known for their distinctive buzz. They are social insects living in colonies with a queen, workers, and males (drones), and are vital pollinators for many plants.",
      characteristics: [
        "Round, fuzzy bodies with black and yellow/orange patterns",
        "Relatively large size compared to honey bees",
        "Make nests in ground cavities, often using abandoned rodent burrows",
        "Can 'buzz pollinate' by vibrating their flight muscles to release pollen",
        "Social insects that form colonies"
      ],
      ecologicalRole: "Bumble bees are keystone pollinators for many wildflowers and crops. Their ability to buzz pollinate makes them essential for certain plants like tomatoes and blueberries.",
      conservation: "Many bumble bee species are in decline globally. They face threats from habitat loss, pesticides, disease, and climate change. Creating flower-rich habitats and reducing pesticide use can help their populations.",
      funFact: "Bumble bees can regulate their body temperature by 'shivering' their flight muscles, allowing them to fly in colder conditions than many other insects.",
      image: "https://imgs.search.brave.com/xhmacG4USCQcSWhyCJKh8eZLeQx0fIMoVNaELyrr99o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Lm53Zi5vcmcvd3At/Y29udGVudC9ibG9n/cy5kaXIvMTEvZmls/ZXMvMjAyMS8wNS9J/bnNlY3QtQnVtYmxl/LUJlZS1DYW5hZGEt/Si1SLUdyYWhhbS0z/MDB4MjQwLmpwZw"
    },
    {
      id: "butterfly",
      name: "Butterfly",
      scientificName: "Lepidoptera (partial)",
      description: "Butterflies are colorful, day-flying insects with large, often brightly-colored wings. They have a long proboscis for feeding on nectar and are important pollinators for many flowering plants.",
      characteristics: [
        "Large, often colorful scaled wings",
        "Long, coiled proboscis for feeding",
        "Club-tipped antennae",
        "Complete metamorphosis with caterpillar, chrysalis, and adult stages",
        "Day-active (diurnal)"
      ],
      ecologicalRole: "Butterflies are important pollinators and also serve as food for birds and other animals. Their caterpillars often have specific host plant requirements, making them indicators of ecosystem health.",
      conservation: "Many butterfly species are declining due to habitat loss, pesticide use, and climate change. Creating butterfly gardens with both nectar plants for adults and host plants for caterpillars can help support their populations.",
      funFact: "Butterfly wings are actually transparent – their colors come from microscopic scales that reflect light in different ways.",
      image: "https://images.pexels.com/photos/13409140/pexels-photo-13409140.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "honey-bees",
      name: "Honey bees",
      scientificName: "Apis mellifera",
      description: "Honey bees are highly social insects that live in large colonies with a single queen. They are known for producing honey and beeswax, and are extensively managed for crop pollination worldwide.",
      characteristics: [
        "Golden-brown and black striped bodies",
        "Moderate body hair",
        "Live in large colonies with thousands of individuals",
        "Complex social structure with queen, workers, and drones",
        "Communicate through 'waggle dance' to indicate food sources"
      ],
      ecologicalRole: "Honey bees are vital agricultural pollinators, responsible for pollinating many fruit, nut, vegetable, and seed crops. A single colony can pollinate millions of flowers in a day.",
      conservation: "Honey bee populations face challenges from parasites (especially Varroa mites), diseases, pesticides, habitat loss, and climate change. Supporting diverse wildflower habitats and reducing pesticide use can help all bee species.",
      funFact: "A honey bee visits about 2 million flowers to produce one pound of honey, and the average worker bee will produce only about 1/12 teaspoon of honey in her lifetime.",
      image: "https://images.pexels.com/photos/144252/bee-honey-bee-apis-insect-144252.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "hover-fly",
      name: "Hover fly",
      scientificName: "Syrphidae",
      description: "Hover flies are flies that mimic bees or wasps but are harmless to humans. They are known for their ability to hover in mid-air and are important pollinators for many plants.",
      characteristics: [
        "Black and yellow/orange patterns resembling wasps or bees",
        "Large eyes that nearly meet at the top of the head",
        "Only one pair of wings (unlike bees which have two pairs)",
        "Ability to hover perfectly still in mid-air",
        "Short antennae"
      ],
      ecologicalRole: "Hover flies are important pollinators for many plants and crops. Their larvae are often predatory, feeding on aphids and other plant pests, making them valuable for biological pest control.",
      conservation: "Hover fly populations are declining in many regions due to habitat loss and pesticide use. Creating flower-rich habitats and reducing pesticide use can help support their populations.",
      funFact: "Despite their convincing bee or wasp appearance, hover flies are completely harmless with no stingers. You can identify them by their hovering flight and their having only one pair of wings.",
      image: "https://images.pexels.com/photos/13062417/pexels-photo-13062417.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "humming-bird",
      name: "Humming bird",
      scientificName: "Trochilidae",
      description: "Hummingbirds are small, colorful birds known for their ability to hover in mid-air and their incredibly fast wing beats. They feed primarily on nectar and are important pollinators for many flowering plants.",
      characteristics: [
        "Small size (typically 3-5 inches)",
        "Iridescent, often brightly colored feathers",
        "Long, thin bill adapted for feeding on nectar",
        "Ability to hover and fly backwards",
        "Extremely rapid wing beats (50-200 times per second)"
      ],
      ecologicalRole: "Hummingbirds are specialized pollinators for many plants with tubular flowers, especially in the Americas. Their long bills and tongues allow them to access nectar that other pollinators cannot reach.",
      conservation: "Hummingbirds face threats from habitat loss, climate change, and pesticide use. Creating gardens with native nectar-producing plants and maintaining natural habitats can help support their populations.",
      funFact: "Hummingbirds have the highest metabolism of any animal except insects, with heart rates up to 1,260 beats per minute and breathing rates up to 250 breaths per minute.",
      image: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "moths",
      name: "Moths",
      scientificName: "Lepidoptera (partial)",
      description: "Moths are close relatives of butterflies but are typically nocturnal. They have feathery or thread-like antennae and are important pollinators for many night-blooming plants.",
      characteristics: [
        "Typically duller colors than butterflies (often brown, gray, or white)",
        "Feathery or thread-like antennae (not clubbed like butterflies)",
        "Wings usually held flat or tent-like at rest",
        "Primarily active at night (nocturnal)",
        "Complete metamorphosis with caterpillar, cocoon, and adult stages"
      ],
      ecologicalRole: "Moths are important pollinators, especially for night-blooming plants. Their caterpillars are also significant herbivores and food sources for birds and other animals.",
      conservation: "Many moth species are declining due to light pollution, habitat loss, pesticide use, and climate change. Reducing outdoor lighting and creating habitats with native plants that support both adults and caterpillars can help moth populations.",
      funFact: "There are about 10 times more species of moths (approximately 160,000) than butterflies (about 17,500) in the world.",
      image: "https://images.pexels.com/photos/14795105/pexels-photo-14795105.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "sun-bird",
      name: "Sun bird",
      scientificName: "Nectariniidae",
      description: "Sunbirds are small, brightly colored birds found in Africa, Asia, and Australia. They feed on nectar using their long, curved bills and are important pollinators for many flowering plants.",
      characteristics: [
        "Small size (typically 4-5 inches)",
        "Slender, curved bills",
        "Males often have iridescent, brightly colored plumage",
        "Brush-tipped tongues for collecting nectar",
        "Agile fliers that can hover briefly (though not as well as hummingbirds)"
      ],
      ecologicalRole: "Sunbirds are important pollinators in Africa, Asia, and Australia, filling ecological niches similar to hummingbirds in the Americas. They pollinate a wide variety of native plants.",
      conservation: "Sunbirds are threatened by habitat loss and fragmentation. Creating gardens with native flowering plants and preserving natural habitats helps support sunbird populations.",
      funFact: "Unlike hummingbirds, sunbirds usually perch while feeding rather than hovering, though they can hover briefly. They also supplement their nectar diet with insects for protein.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Bsk4d5yGVXHMLsMcd54pJX7DWpn96AhhtQ&s"
    },
    {
      id: "wasp",
      name: "Wasp",
      scientificName: "Vespidae and others",
      description: "Wasps are flying insects with smooth bodies, narrow waists, and often distinctive black and yellow markings. While known for their stingers, many species are beneficial pollinators and predators of pest insects.",
      characteristics: [
        "Smooth, shiny bodies with little hair (unlike bees)",
        "Narrow 'waist' between thorax and abdomen",
        "Often have black and yellow/white warning coloration",
        "Some species are social, others solitary",
        "Powerful stingers (in females) that can be used repeatedly"
      ],
      ecologicalRole: "While not as efficient as bees, many wasps visit flowers and contribute to pollination. They also serve as important predators of pest insects, helping to control their populations naturally.",
      conservation: "Like many insects, wasps are affected by habitat loss, pesticide use, and climate change. Creating diverse habitats with flowering plants and nesting sites for solitary wasps can support their populations.",
      funFact: "Not all wasps are aggressive! The majority of wasp species are solitary and unlikely to sting humans unless directly handled. Many are parasitic on other insects and extremely tiny.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf1y_9yOGA31eeSWJSiPi8WFz7lXYVrh-sqQ&s"
    },
  ];

  const filteredSpecies = pollinatorSpecies.filter(species =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white flex flex-col p-6 md:p-10 font-sans">
      <div className="max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-yellow-700 drop-shadow-lg tracking-tight flex items-center gap-3"
          >
            <Book className="h-8 w-8 md:h-10 md:w-10" />
            Pollinator Species Guide
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-yellow-300"
        >
          <p className="text-lg text-yellow-700 mb-6">
            Welcome to our comprehensive guide to pollinator species! Learn about the diverse creatures that help our plants reproduce and sustain our ecosystems. Use the search box to find specific pollinators or browse through our catalog below.
          </p>
          
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search for a species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none transition-colors"
            />
            <Search className="absolute left-3 top-3 text-yellow-500" size={20} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecies.map(species => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                  activeSpecies === species.id 
                    ? "border-yellow-500 ring-2 ring-yellow-300" 
                    : "border-yellow-200 hover:border-yellow-400"
                }`}
              >
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${species.image})` }}
                ></div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-yellow-800 mb-1">{species.name}</h3>
                  <p className="text-sm italic text-yellow-600 mb-3">{species.scientificName}</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{species.description}</p>
                  <button
                    onClick={() => setActiveSpecies(activeSpecies === species.id ? null : species.id)}
                    className="flex items-center justify-center w-full py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium transition-colors"
                  >
                    {activeSpecies === species.id ? "Show Less" : "Learn More"}
                    <ChevronDown 
                      className={`ml-2 transition-transform ${activeSpecies === species.id ? "rotate-180" : ""}`} 
                      size={18} 
                    />
                  </button>
                  
                  {activeSpecies === species.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-yellow-200"
                    >
                      <div className="mb-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Key Characteristics:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {species.characteristics.map((trait, index) => (
                            <li key={index}>{trait}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Ecological Role:</h4>
                        <p className="text-sm text-gray-700">{species.ecologicalRole}</p>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Conservation:</h4>
                        <p className="text-sm text-gray-700">{species.conservation}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Fun Fact:</h4>
                        <p className="text-sm text-gray-700">{species.funFact}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-yellow-600 text-center py-6"
        >
          Built with 🧠 YOLOv5 & 🖥️ React + Flask | 🐝 Pollinator Tracker Project
        </motion.footer>
      </div>
    </div>
  );
}