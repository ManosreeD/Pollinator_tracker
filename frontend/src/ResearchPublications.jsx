import { motion } from "framer-motion";
import { BookOpen, Search, ExternalLink, Download, Calendar, User, Users } from "lucide-react";
import { useState } from "react";

export default function ResearchPublications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const publications = [
    {
      id: 1,
      title: "Diversity and Abundance of Wild Bees in an Agricultural Landscape",
      authors: "Zhang, L., Thompson, H.M., & Garcia, A.R.",
      journal: "Journal of Agricultural Entomology",
      year: 2023,
      abstract: "This study examines the diversity and abundance of wild bee species across various agricultural landscapes, finding that areas with diverse plantings and reduced pesticide use supported significantly more pollinator species and higher population densities.",
      tags: ["wild bees", "agriculture", "biodiversity", "conservation"],
      link: "#",
      type: "journal",
      pollinators: ["Bumble bees", "Honey bees", "Hover fly"]
    },
    {
      id: 2,
      title: "Impact of Urban Gardens on Butterfly Populations",
      authors: "Patel, S., Okonjo, E., & Williams, D.T.",
      journal: "Urban Ecology",
      year: 2022,
      abstract: "This research investigates how urban garden design and plant selection influence butterfly diversity and abundance in metropolitan areas. Results suggest that even small garden spaces can significantly contribute to butterfly conservation if planted with appropriate native nectar and host plants.",
      tags: ["butterfly", "urban ecology", "conservation", "habitat"],
      link: "#",
      type: "journal",
      pollinators: ["Butterfly", "Moths"]
    },
    {
      id: 3,
      title: "Pollination Efficiency of Native Bees vs. Managed Honey Bees in Apple Orchards",
      authors: "Johnson, R.M., Chen, W., & Kowalski, P.",
      journal: "Pollination Biology",
      year: 2021,
      abstract: "Comparing the pollination effectiveness of native bee species against managed honey bee colonies in commercial apple orchards, this study found that diverse wild bee communities provided more consistent pollination services and produced higher fruit set rates than honey bees alone.",
      tags: ["pollination", "honey bees", "wild bees", "agriculture"],
      link: "#",
      type: "journal",
      pollinators: ["Bumble bees", "Honey bees"]
    },
    {
      id: 4,
      title: "Climate Change Effects on Pollinator-Plant Synchrony",
      authors: "Mendoza, F.L., & Bjornstad, A.",
      journal: "Global Change Biology",
      year: 2023,
      abstract: "This longitudinal study documents how climate change is disrupting the timing synchrony between flowering plants and their pollinators, with potential cascading effects on ecosystem stability and agricultural productivity.",
      tags: ["climate change", "phenology", "ecological mismatch", "conservation"],
      link: "#",
      type: "journal",
      pollinators: ["Butterfly", "Bumble bees", "Hover fly"]
    },
    {
      id: 5,
      title: "Hummingbird Pollination Networks in Tropical Forest Fragments",
      authors: "Costa, M.A., Silva, J.P., & Vasconcelos, T.R.",
      journal: "Tropical Ecology",
      year: 2022,
      abstract: "Analyzing pollination networks between hummingbirds and flowering plants in fragmented tropical forests, this research highlights the importance of maintaining forest connectivity to preserve these specialized pollination relationships.",
      tags: ["hummingbird", "tropical forest", "fragmentation", "networks"],
      link: "#",
      type: "journal",
      pollinators: ["Humming bird"]
    },
    {
      id: 6,
      title: "The Role of Bee Flies in Wildflower Pollination",
      authors: "Tanner, L.B., & Richards, P.Q.",
      journal: "Insect Conservation",
      year: 2021,
      abstract: "This study investigates the previously underestimated contribution of bee flies (Bombyliidae) to wildflower pollination in grassland ecosystems, finding they are particularly important for early spring bloomers.",
      tags: ["bee flies", "grassland", "pollination efficiency", "wildflowers"],
      link: "#",
      type: "journal",
      pollinators: ["Bee fly"]
    },
    {
      id: 7,
      title: "Automated Monitoring of Pollinators Using Computer Vision",
      authors: "Kapoor, A., Wilson, J.B., & Lee, S.M.",
      journal: "Ecological Informatics",
      year: 2023,
      abstract: "This technical paper describes a novel computer vision system for automatically detecting and classifying insect pollinators in field conditions, enabling large-scale monitoring of pollinator populations with minimal human intervention.",
      tags: ["computer vision", "monitoring", "technology", "conservation"],
      link: "#",
      type: "technical",
      pollinators: ["Butterfly", "Bumble bees", "Hover fly", "Beetle", "Wasp"]
    },
    {
      id: 8,
      title: "Citizen Science for Pollinator Conservation: Methods and Impact",
      authors: "Fernandez, D.H., & Olsen, T.K.",
      journal: "Biodiversity and Conservation",
      year: 2022,
      abstract: "Evaluating the effectiveness of citizen science programs for monitoring and conserving pollinator populations, this paper provides best practices for project design and data validation to maximize scientific and conservation outcomes.",
      tags: ["citizen science", "community engagement", "conservation", "methodology"],
      link: "#",
      type: "review",
      pollinators: ["Butterfly", "Bumble bees", "Honey bees", "Moths"]
    },
    {
      id: 9,
      title: "Sunbird Pollination Systems in African Savanna Ecosystems",
      authors: "Nkosi, B.M., & Anderson, K.L.",
      journal: "African Journal of Ecology",
      year: 2021,
      abstract: "This research documents the specialized relationships between sunbirds and native flowering plants in African savanna ecosystems, highlighting their co-evolutionary adaptations and vulnerability to habitat changes.",
      tags: ["sunbird", "savanna", "co-evolution", "specialization"],
      link: "#",
      type: "journal",
      pollinators: ["Sun bird"]
    },
    {
      id: 10,
      title: "Beetle Pollinators: Overlooked Contributors to Ecosystem Services",
      authors: "Henderson, R.J., Lopez, M.A., & Yoon, S.",
      journal: "Insect Ecology",
      year: 2023,
      abstract: "This comprehensive review explores the often-overlooked role of beetles in pollination services across various ecosystems, documenting their significance for primitive flowering plants and certain agricultural crops.",
      tags: ["beetle", "pollination", "ecosystem services", "review"],
      link: "#",
      type: "review",
      pollinators: ["Beetle"]
    },
    {
      id: 11,
      title: "Artificial Light at Night: Impacts on Moth Pollinators",
      authors: "Parker, T.S., & Rivera, G.M.",
      journal: "Conservation Biology",
      year: 2022,
      abstract: "Investigating how artificial light pollution affects nocturnal moth pollinators, this study finds significant disruptions to moth behavior, reproduction, and pollination services in illuminated areas compared to naturally dark environments.",
      tags: ["moths", "light pollution", "nocturnal pollinators", "conservation"],
      link: "#",
      type: "journal",
      pollinators: ["Moths"]
    },
    {
      id: 12,
      title: "Wasps as Pollinators: Contributions and Conservation Needs",
      authors: "Yamamoto, H., & Gonzalez, F.C.",
      journal: "Journal of Hymenoptera Research",
      year: 2021,
      abstract: "Examining the underappreciated role of wasps in pollination ecology, this study documents their contributions to fig reproduction, orchid pollination, and generalist flower visitation, calling for greater inclusion in pollinator conservation programs.",
      tags: ["wasps", "pollination", "conservation", "figs"],
      link: "#",
      type: "journal",
      pollinators: ["Wasp"]
    },
    {
      id: 13,
      title: "The Pollinator Decline Crisis: A Global Review and Conservation Strategy",
      authors: "International Pollinator Research Consortium",
      journal: "Nature Reviews Ecology & Evolution",
      year: 2023,
      abstract: "This landmark review synthesizes global evidence for pollinator declines across taxa, identifies key threats, and proposes a comprehensive international strategy to reverse pollinator losses through policy, research, and conservation action.",
      tags: ["pollinator decline", "policy", "conservation", "global review"],
      link: "#",
      type: "review",
      pollinators: ["Bumble bees", "Honey bees", "Butterfly", "Moths", "Hover fly", "Beetle", "Bee fly", "Wasp", "Humming bird", "Sun bird"]
    },
    {
      id: 14,
      title: "Hover Fly Response to Floral Volatiles: Implications for Targeted Conservation",
      authors: "Quinn, J.P., & Sadeghi, N.",
      journal: "Chemical Ecology",
      year: 2022,
      abstract: "This study examines how different hover fly species respond to floral volatile compounds, providing insights for designing targeted plantings to support these important pollinators and biological control agents in agricultural systems.",
      tags: ["hover fly", "floral volatiles", "sensory ecology", "conservation"],
      link: "#",
      type: "journal",
      pollinators: ["Hover fly"]
    },
    {
      id: 15,
      title: "Economic Valuation of Wild Pollination Services in Major Crop Systems",
      authors: "World Agricultural Economics Institute",
      journal: "Ecological Economics",
      year: 2023,
      abstract: "This global economic analysis quantifies the monetary value of wild pollinator contributions to major crop systems, demonstrating their multi-billion dollar annual value and providing economic justification for habitat conservation in agricultural landscapes.",
      tags: ["economic valuation", "ecosystem services", "agriculture", "policy"],
      link: "#",
      type: "technical",
      pollinators: ["Bumble bees", "Hover fly", "Bee fly", "Beetle", "Wasp"]
    }
  ];

  // Filter publications based on search term and active filter
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.pollinators.some(pollinator => pollinator.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "journal") return matchesSearch && pub.type === "journal";
    if (activeFilter === "review") return matchesSearch && pub.type === "review";
    if (activeFilter === "technical") return matchesSearch && pub.type === "technical";
    
    // Filter by pollinator type
    return matchesSearch && pub.pollinators.includes(activeFilter);
  });

  // Get list of unique pollinator types for filter
  const pollinatorTypes = [...new Set(publications.flatMap(pub => pub.pollinators))].sort();

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
            <BookOpen className="h-8 w-8 md:h-10 md:w-10" />
            Research & Publications
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-yellow-300"
        >
          <p className="text-lg text-yellow-700 mb-6">
            Explore the latest scientific research on pollinators and their conservation. Our curated collection features peer-reviewed studies, review articles, and technical reports focusing on various pollinator species and their ecological importance.
          </p>
          
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-3 text-yellow-500" size={20} />
            </div>
            
            <div className="flex-shrink-0">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full md:w-64 px-4 py-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none transition-colors bg-white"
              >
                <option value="all">All Publications</option>
                <optgroup label="Publication Type">
                  <option value="journal">Journal Articles</option>
                  <option value="review">Reviews</option>
                  <option value="technical">Technical Reports</option>
                </optgroup>
                <optgroup label="Pollinator Type">
                  {pollinatorTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <p className="text-sm text-yellow-600 mb-6">
            Found {filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'}
            {activeFilter !== 'all' && activeFilter !== 'journal' && activeFilter !== 'review' && activeFilter !== 'technical' ? 
              ` related to ${activeFilter}` : 
              activeFilter !== 'all' ? ` of type ${activeFilter}` : ''}
          </p>
          
          {/* Publications list */}
          <div className="space-y-6">
            {filteredPublications.length > 0 ? (
              filteredPublications.map(pub => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-yellow-50 rounded-xl p-5 shadow-sm border border-yellow-200 hover:border-yellow-400 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-yellow-800 mb-2">{pub.title}</h3>
                    <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-medium">
                      {pub.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <User size={16} />
                    <span>{pub.authors}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{pub.journal}, {pub.year}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{pub.abstract}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-yellow-700 mb-2">Related Pollinators:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pub.pollinators.map((pollinator, index) => (
                        <span 
                          key={index}
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                        >
                          {pollinator}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-white text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={pub.link} 
                      className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Publication
                    </a>
                    <a 
                      href={`#download-${pub.id}`}
                      className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 transition-colors"
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-yellow-700">No publications match your search criteria.</p>
                <button 
                  className="mt-4 text-sm text-yellow-600 hover:text-yellow-800 underline"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-yellow-300"
        >
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <Users size={24} />
            Contribute to Pollinator Research
          </h2>
          <p className="text-lg text-yellow-700 mb-6">
            Are you a researcher working on pollinator studies? We welcome submissions of recently published work to be featured in our publications database. Help us build a comprehensive resource for pollinator science and conservation.
          </p>
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 shadow-md">
            Submit Your Research
          </button>
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