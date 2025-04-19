import { motion } from "framer-motion";
import { Settings, Terminal, Play, Code, Wrench, FileCode, Server } from "lucide-react";

export default function Setup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white flex flex-col p-6 md:p-10 font-sans">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-yellow-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-700">Project Setup</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
                <Wrench className="h-6 w-6" />
                Prerequisites
              </h2>
              
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Python 3.8+ installed</li>
                  <li>Node.js &amp; npm installed</li>
                  <li>Git installed</li>
                  <li>Basic knowledge of command line operations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
                <Terminal className="h-6 w-6" />
                Step-by-Step Installation
              </h2>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Code size={18} />
                      1. Clone the Repository
                    </h3>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-sm">
                      <code>
                        git clone https://github.com/ManosreeD/Pollinator_tracker.git<br/>
                        cd Pollinator_tracker
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Server size={18} />
                      2. Set Up Backend
                    </h3>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-sm">
                      <code>
                        # Create a virtual environment<br/>
                        python -m venv venv<br/>
                        <br/>
                        # Activate the virtual environment<br/>
                        # For Windows:<br/>
                        venv\Scripts\activate<br/>
                        # For Mac/Linux:<br/>
                        # source venv/bin/activate<br/>
                        <br/>
                        # Install dependencies<br/>
                        pip install -r requirements.txt<br/>
                        <br/>
                        # Download YOLOv5 model<br/>
                        cd backend<br/>
                        python -c "import torch; torch.hub.download_url_to_file('https://github.com/ultralytics/yolov5/releases/download/v7.0/yolov5s.pt', 'best.pt')"
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <FileCode size={18} />
                      3. Set Up Frontend
                    </h3>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-sm">
                      <code>
                        # Navigate to frontend directory<br/>
                        cd ../frontend<br/>
                        <br/>
                        # Install dependencies<br/>
                        npm install<br/>
                        <br/>
                        # Build the frontend (optional for production)<br/>
                        # npm run build
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Play size={18} />
                      4. Run the Application
                    </h3>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Terminal 1: Run the Backend</h4>
                      <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-sm">
                        <code>
                          # From the root directory, with venv activated<br/>
                          cd backend<br/>
                          python app.py
                        </code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Terminal 2: Run the Frontend</h4>
                      <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-sm">
                        <code>
                          # From the root directory, in a new terminal<br/>
                          cd frontend<br/>
                          npm run dev
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">Common Issues &amp; Solutions</h2>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Missing Dependencies</h3>
                  <p className="text-gray-700">If you encounter errors about missing packages, ensure you've activated the virtual environment and try reinstalling requirements:</p>
                  <pre className="bg-gray-800 text-gray-200 p-2 rounded mt-2 text-sm">pip install -r requirements.txt</pre>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">CUDA Issues</h3>
                  <p className="text-gray-700">If experiencing GPU-related errors, try running in CPU-only mode by modifying the model loading code in app.py to specify:</p>
                  <pre className="bg-gray-800 text-gray-200 p-2 rounded mt-2 text-sm">model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=True, device='cpu')</pre>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Port Already in Use</h3>
                  <p className="text-gray-700">If port 5000 is already in use, you can change the port in app.py:</p>
                  <pre className="bg-gray-800 text-gray-200 p-2 rounded mt-2 text-sm">app.run(host='0.0.0.0', port=5001, debug=True)</pre>
                  <p className="text-gray-700 mt-2">Then update the API endpoint URLs in the frontend code accordingly.</p>
                </div>
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