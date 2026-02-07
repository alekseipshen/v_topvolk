export default function TestGallery() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Image Test</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Test 1: Direct img tag */}
        <div>
          <h2 className="text-sm mb-2">Direct img</h2>
          <img 
            src="/assets/works/_01m.jpg" 
            alt="test 1"
            className="w-full"
          />
        </div>

        {/* Test 2: With fixed height */}
        <div>
          <h2 className="text-sm mb-2">Fixed height (h-64)</h2>
          <div className="h-64">
            <img 
              src="/assets/works/_02m.jpg" 
              alt="test 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Test 3: Like Our Services */}
        <div>
          <h2 className="text-sm mb-2">Like Our Services</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-64 overflow-hidden">
              <img 
                src="/assets/works/_03m.jpg" 
                alt="test 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All preview images:</h2>
        <div className="grid grid-cols-6 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <img 
              key={i}
              src={`/assets/works/_0${i}m.jpg`} 
              alt={`Preview ${i}`}
              className="w-full aspect-square object-cover border-2 border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
