export default function TestHero() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Hero Background Test</h1>
      
      {/* Test 1: Direct img tag */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 1: Direct img tag</h2>
        <div className="w-full h-64 border-2 border-red-500">
          <img 
            src="/hero-bg.jpg" 
            alt="Test" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Test 2: CSS background */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 2: CSS background-image</h2>
        <div 
          className="w-full h-64 border-2 border-blue-500"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Test 3: With overlay like HeroHome */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 3: With overlay (like HeroHome)</h2>
        <div className="relative w-full h-64 border-2 border-green-500">
          <div className="absolute inset-0 bg-gray-300">
            <img 
              src="/hero-bg.jpg" 
              alt="Test" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-white/60 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <p className="text-2xl font-bold">Text Over Image</p>
          </div>
        </div>
      </div>

      {/* Test 4: Alternative images */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 4: Other hero images</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="mb-2">hero-appliance.jpg</p>
            <img src="/hero-appliance.jpg" alt="appliance" className="w-full h-32 object-cover" />
          </div>
          <div>
            <p className="mb-2">hero-bg-mobile.jpg</p>
            <img src="/hero-bg-mobile.jpg" alt="mobile" className="w-full h-32 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
