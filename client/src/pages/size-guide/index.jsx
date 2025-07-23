import React from 'react';

function SizeGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            Size Guide
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Find your perfect fit with our comprehensive size guide. Choose the right size to ensure 
            comfort and style in every purchase.
          </p>
        </div>

        {/* Size Chart Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Women's Clothing
          </button>
          <button className="bg-white/80 text-amber-800 font-bold py-3 px-8 rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300">
            Men's Clothing
          </button>
          <button className="bg-white/80 text-amber-800 font-bold py-3 px-8 rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300">
            Footwear
          </button>
          <button className="bg-white/80 text-amber-800 font-bold py-3 px-8 rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300">
            Accessories
          </button>
        </div>

        {/* Measurement Guide */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center tracking-tight">
            How to Measure Yourself
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-amber-900 mb-4">📏 Measuring Tips</h3>
              <ul className="space-y-3 text-amber-700/85 font-medium">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  Use a soft measuring tape for accurate results
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  Measure over close-fitting undergarments
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  Keep the tape parallel to the floor
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  Don't pull the tape too tight or too loose
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-4">🎯 Key Measurements</h3>
              <ul className="space-y-3 text-amber-700/85 font-medium">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  <strong>Chest/Bust:</strong> Around the fullest part of your chest
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  <strong>Waist:</strong> Around the narrowest part of your waist
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  <strong>Hips:</strong> Around the fullest part of your hips
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></span>
                  <strong>Inseam:</strong> From crotch to ankle along inside leg
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Women's Size Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center tracking-tight">Women's Clothing Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-amber-700">
              <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Size</th>
                  <th className="px-4 py-3 text-center font-bold">Bust (inches)</th>
                  <th className="px-4 py-3 text-center font-bold">Waist (inches)</th>
                  <th className="px-4 py-3 text-center font-bold">Hips (inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200">
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">XS</td>
                  <td className="px-4 py-3 text-center">31-32</td>
                  <td className="px-4 py-3 text-center">24-25</td>
                  <td className="px-4 py-3 text-center">34-35</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">S</td>
                  <td className="px-4 py-3 text-center">33-34</td>
                  <td className="px-4 py-3 text-center">26-27</td>
                  <td className="px-4 py-3 text-center">36-37</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">M</td>
                  <td className="px-4 py-3 text-center">35-36</td>
                  <td className="px-4 py-3 text-center">28-29</td>
                  <td className="px-4 py-3 text-center">38-39</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">L</td>
                  <td className="px-4 py-3 text-center">37-39</td>
                  <td className="px-4 py-3 text-center">30-32</td>
                  <td className="px-4 py-3 text-center">40-42</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">XL</td>
                  <td className="px-4 py-3 text-center">40-42</td>
                  <td className="px-4 py-3 text-center">33-35</td>
                  <td className="px-4 py-3 text-center">43-45</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">XXL</td>
                  <td className="px-4 py-3 text-center">43-45</td>
                  <td className="px-4 py-3 text-center">36-38</td>
                  <td className="px-4 py-3 text-center">46-48</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Men's Size Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center tracking-tight">Men's Clothing Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-amber-700">
              <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Size</th>
                  <th className="px-4 py-3 text-center font-bold">Chest (inches)</th>
                  <th className="px-4 py-3 text-center font-bold">Waist (inches)</th>
                  <th className="px-4 py-3 text-center font-bold">Neck (inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200">
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">S</td>
                  <td className="px-4 py-3 text-center">35-37</td>
                  <td className="px-4 py-3 text-center">29-31</td>
                  <td className="px-4 py-3 text-center">14-14.5</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">M</td>
                  <td className="px-4 py-3 text-center">38-40</td>
                  <td className="px-4 py-3 text-center">32-34</td>
                  <td className="px-4 py-3 text-center">15-15.5</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">L</td>
                  <td className="px-4 py-3 text-center">42-44</td>
                  <td className="px-4 py-3 text-center">36-38</td>
                  <td className="px-4 py-3 text-center">16-16.5</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">XL</td>
                  <td className="px-4 py-3 text-center">46-48</td>
                  <td className="px-4 py-3 text-center">40-42</td>
                  <td className="px-4 py-3 text-center">17-17.5</td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="px-4 py-3 font-bold">XXL</td>
                  <td className="px-4 py-3 text-center">50-52</td>
                  <td className="px-4 py-3 text-center">44-46</td>
                  <td className="px-4 py-3 text-center">18-18.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footwear Size Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center tracking-tight">Footwear Size Chart</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-amber-900 mb-4 text-center">Women's Shoes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-amber-700">
                  <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold">US Size</th>
                      <th className="px-3 py-2 text-center font-bold">UK Size</th>
                      <th className="px-3 py-2 text-center font-bold">EU Size</th>
                      <th className="px-3 py-2 text-center font-bold">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-200">
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">6</td>
                      <td className="px-3 py-2 text-center">3.5</td>
                      <td className="px-3 py-2 text-center">36</td>
                      <td className="px-3 py-2 text-center">22.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">7</td>
                      <td className="px-3 py-2 text-center">4.5</td>
                      <td className="px-3 py-2 text-center">37</td>
                      <td className="px-3 py-2 text-center">23.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">8</td>
                      <td className="px-3 py-2 text-center">5.5</td>
                      <td className="px-3 py-2 text-center">38</td>
                      <td className="px-3 py-2 text-center">24.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">9</td>
                      <td className="px-3 py-2 text-center">6.5</td>
                      <td className="px-3 py-2 text-center">39</td>
                      <td className="px-3 py-2 text-center">25.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-4 text-center">Men's Shoes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-amber-700">
                  <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold">US Size</th>
                      <th className="px-3 py-2 text-center font-bold">UK Size</th>
                      <th className="px-3 py-2 text-center font-bold">EU Size</th>
                      <th className="px-3 py-2 text-center font-bold">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-200">
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">8</td>
                      <td className="px-3 py-2 text-center">7</td>
                      <td className="px-3 py-2 text-center">41</td>
                      <td className="px-3 py-2 text-center">25.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">9</td>
                      <td className="px-3 py-2 text-center">8</td>
                      <td className="px-3 py-2 text-center">42</td>
                      <td className="px-3 py-2 text-center">26.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">10</td>
                      <td className="px-3 py-2 text-center">9</td>
                      <td className="px-3 py-2 text-center">43</td>
                      <td className="px-3 py-2 text-center">27.5</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-3 py-2 font-bold">11</td>
                      <td className="px-3 py-2 text-center">10</td>
                      <td className="px-3 py-2 text-center">44</td>
                      <td className="px-3 py-2 text-center">28.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Tips */}
        <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
          <h3 className="text-xl font-bold text-amber-900 mb-6 text-center tracking-tight">Helpful Size Tips</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">?</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Between Sizes?</h4>
              <p className="text-amber-700/80 text-sm font-medium">
                When in doubt, size up for comfort. Check individual product pages for specific fit information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">💡</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Fit Preference</h4>
              <p className="text-amber-700/80 text-sm font-medium">
                Consider your preferred fit - relaxed, regular, or slim - when choosing your size.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📞</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Need Help?</h4>
              <p className="text-amber-700/80 text-sm font-medium">
                Contact our customer service team for personalized sizing assistance.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/contact"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeGuide;
