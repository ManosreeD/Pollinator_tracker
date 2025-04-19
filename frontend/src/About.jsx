import { motion } from "framer-motion";
import { Info, Github, ExternalLink, Camera, Leaf, Bug, Code } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white flex flex-col p-6 md:p-10 font-sans">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-yellow-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-700">About The Project</h1>
          </div>
          
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">🐝 Pollinator Tracker</h2>
              <p className="text-gray-700 leading-relaxed">
                Pollinator Tracker is an AI-powered application designed to detect, identify, and track pollinating insects in images and videos. 
                Built with YOLOv5 object detection and a Flask+React architecture, this tool helps researchers, conservationists, and 
                citizen scientists monitor pollinator populations and activity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center text-center">
                  <Camera className="h-8 w-8 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-yellow-800 mb-1">Detection</h3>
                  <p className="text-gray-600 text-sm">
                    Accurately detects pollinating insects in images and videos using advanced computer vision
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center text-center">
                  <Bug className="h-8 w-8 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-yellow-800 mb-1">Identification</h3>
                  <p className="text-gray-600 text-sm">
                    Classifies different species of pollinators with high accuracy
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center text-center">
                  <Leaf className="h-8 w-8 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-yellow-800 mb-1">Conservation</h3>
                  <p className="text-gray-600 text-sm">
                    Supports biodiversity monitoring and conservation efforts
                  </p>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">How It Works</h2>
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li className="pl-2">
                    <span className="font-medium text-yellow-800">Upload:</span> Submit an image or video containing potential pollinators
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-yellow-800">Detection:</span> The YOLOv5 model processes the media and identifies pollinator species
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-yellow-800">Analysis:</span> The application counts and classifies each detected pollinator
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-yellow-800">Visualization:</span> Results are displayed with annotated bounding boxes and statistics
                  </li>
                </ol>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <Code size={20} />
                    Frontend
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>React (Vite)</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                    <li>React Router</li>
                    <li>Lucide React icons</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <Code size={20} />
                    Backend
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Flask</li>
                    <li>YOLOv5</li>
                    <li>PyTorch</li>
                    <li>OpenCV</li>
                    <li>NumPy</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">Why Pollinators Matter</h2>
              <p className="text-gray-700 leading-relaxed">
                Pollinators play a crucial role in global ecosystems and food production. They are responsible for the 
                reproduction of over 85% of the world's flowering plants, including more than two-thirds of the world's crop species. 
                The ongoing decline in pollinator populations poses a significant threat to biodiversity and food security.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By monitoring and tracking pollinators, we can better understand their behavior, distribution, and population trends, 
                which is essential for developing effective conservation strategies.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">Contributing</h2>
              <p className="text-gray-700 leading-relaxed">
                Pollinator Tracker is an open-source project, and we welcome contributions from developers, researchers, and 
                conservation enthusiasts. Whether you're improving the detection model, enhancing the UI, or expanding the 
                species database, your help is valuable.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <a 
                  href="https://github.com/ManosreeD/Pollinator_tracker.git"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </section>
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