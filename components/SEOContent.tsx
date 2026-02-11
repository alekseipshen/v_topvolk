interface SEOContentProps {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

export default function SEOContent({ city, appliance, brand, county }: SEOContentProps) {
  const cityName = city ? formatCityName(city) : null;
  const applianceName = appliance ? formatApplianceName(appliance) : null;
  const brandName = brand ? formatBrandName(brand) : null;
  
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {renderContent({ city: cityName, appliance: applianceName, brand: brandName, county })}
        </div>
      </div>
    </section>
  );
}

function renderContent({ city, appliance, brand, county }: any) {
  // Special handling for Built-In Oven with all alternative names
  const isBuiltInOven = appliance?.toLowerCase().includes('built-in oven');
  const builtInOvenAliases = 'built-in oven, built-in microoven, double wall oven, built-in double oven, oven/microwave combo, stacked oven, wall oven, or combination oven';
  
  if (city && brand && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Expert {brand} {appliance} Repair in {city} & Surrounding Cities
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {brand} {appliance.toLowerCase()}{isBuiltInOven ? ` (including ${builtInOvenAliases})` : ''} breaks down in {city} or surrounding areas, you need a repair service you can trust. 
            <strong> TopVolk Construction</strong> has been providing expert {brand} appliance repairs throughout {city} and the greater Seattle area 
            for over 20 years. Our factory-trained technicians specialize in {brand} appliances and can diagnose and fix issues quickly.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Our {city}-area technicians have seen it all when it comes to {brand} {appliance.toLowerCase()} repairs. 
            Whether it's a minor issue or a major breakdown, we have the expertise to get your appliance working again. 
            Call us today at <strong>(206) 591-1096</strong> for fast, professional {brand} appliance repair in {city} and nearby cities.
          </p>
        </div>
      </div>
    );
  } else if (city && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Professional {appliance} Repair Services in {city} & Surrounding Cities
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            Is your {appliance.toLowerCase()}{isBuiltInOven ? ` (${builtInOvenAliases})` : ''} acting up in {city} or nearby areas? <strong>TopVolk Construction</strong> provides expert {appliance.toLowerCase()} 
            repair for all major brands throughout {city} and the greater Seattle area. With over 20 years of experience, 
            our certified technicians can diagnose and repair your {appliance.toLowerCase()} quickly and efficiently.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            We know how disruptive a broken {appliance.toLowerCase()} can be to your daily routine. That's why we offer <strong>same-day 
            service</strong> to {city} and surrounding city residents whenever possible. Our technicians arrive prepared with the most common parts needed for 
            {appliance.toLowerCase()} repairs, so we can often complete the job in a single visit.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Our {city}-area team works on all major appliance brands - LG, Samsung, Whirlpool, GE, Maytag, Bosch, KitchenAid, and more. 
            Call <strong>(206) 591-1096</strong> for immediate assistance!
          </p>
        </div>
      </div>
    );
  } else if (city && brand) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {brand} Appliance Repair in {city} & Surrounding Cities
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            Looking for reliable {brand} appliance repair in {city} or nearby areas? <strong>TopVolk Construction</strong> specializes in {brand} appliances 
            and has been serving {city} and surrounding city residents for over 20 years. Our factory-trained technicians are experts in diagnosing 
            and repairing all {brand} appliance models.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            {brand} appliances are known for quality and innovation, and they deserve quality repair service. Our technicians 
            undergo continuous training on {brand} products to ensure they can handle any issue. We use genuine {brand} parts 
            for all repairs in the {city} area, ensuring your appliance works like new.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Contact us today for expert {brand} appliance repair in {city} and surrounding cities. Call <strong>(206) 591-1096</strong> for same-day service!
          </p>
        </div>
      </div>
    );
  } else if (brand && appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {brand} {appliance} Repair Across Seattle, WA
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {brand} {appliance.toLowerCase()}{isBuiltInOven ? ` (${builtInOvenAliases})` : ''} needs repair, trust the experts at <strong>TopVolk Construction</strong>. 
            We've been providing professional {brand} {appliance.toLowerCase()} repair throughout the Seattle area for over 20 years. 
            Our factory-trained technicians specialize in {brand} appliances and can quickly diagnose and fix any issue.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Our experienced technicians have repaired thousands of {brand} {appliance.toLowerCase()}s across the Seattle area. 
            No matter what's wrong with your {appliance.toLowerCase()}, we have the expertise to fix it right the first time. 
            We use only authentic {brand} replacement parts and back all repairs with our service guarantee.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Call <strong>(206) 591-1096</strong> today to schedule your {brand} {appliance.toLowerCase()} repair!
          </p>
        </div>
      </div>
    );
  } else if (city) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Trusted Home Renovation in {city} & Surrounding Cities
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            <strong>TopVolk Construction</strong> is the {city} area's premier home renovation company, serving residents and businesses throughout 
            the region for over 20 years. We repair all major appliance brands and types - from refrigerators and washers to 
            ovens and dishwashers.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Whether you need refrigerator repair, washer and dryer service, dishwasher maintenance, or oven repair in {city} or nearby cities, 
            we've got you covered. Our team arrives equipped with the most common replacement parts, allowing us to complete 
            most repairs in a single visit. Same-day appointments available for {city}-area residents.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Don't let a broken appliance disrupt your life. Call <strong>(206) 591-1096</strong> now for expert appliance 
            repair in {city} and surrounding areas!
          </p>
        </div>
      </div>
    );
  } else if (brand) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Professional {brand} Appliance Repair in Seattle, WA
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            <strong>TopVolk Construction</strong> is Seattle's trusted source for {brand} appliance repair. With over 20 years of experience 
            and factory-trained technicians, we specialize in servicing all {brand} appliance models. From routine maintenance to 
            complex repairs, we're the {brand} experts you can count on throughout King County, Snohomish County, Pierce County, and Kitsap County.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Our technicians undergo continuous training on {brand} products and use only genuine {brand} replacement parts. 
            This ensures your appliance is repaired to manufacturer specifications and continues to perform reliably. We provide 
            {brand} appliance repair throughout the Seattle area with same-day service available for most areas.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Trust the {brand} repair specialists. Call <strong>(206) 591-1096</strong> today for expert service!
          </p>
        </div>
      </div>
    );
  } else if (appliance) {
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Expert {appliance} Repair Throughout Seattle, WA
        </h2>
        
        <div className="text-gray-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            When your {appliance.toLowerCase()}{isBuiltInOven ? ` (including ${builtInOvenAliases})` : ''} breaks down, you need fast, reliable repair service. <strong>TopVolk Construction</strong> has been 
            Seattle's trusted {appliance.toLowerCase()} repair company for over 20 years. Our certified technicians service all 
            major brands and can diagnose and fix {appliance.toLowerCase()} issues quickly and efficiently.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            We provide professional {appliance.toLowerCase()} repair throughout Seattle, WA, covering King County, Snohomish County, Pierce County, and Kitsap County. 
            Whether you're in any of our service areas, we're ready to help with same-day service available in most areas.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Need {appliance.toLowerCase()} repair? Call <strong>(206) 591-1096</strong> for same-day service!
          </p>
        </div>
      </div>
    );
  }
  
  return null;
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBrandName(slug: string): string {
  const brandMap: { [key: string]: string } = {
    'lg': 'LG',
    'ge': 'GE',
    'ge-appliances': 'GE Appliances',
    'ge-profile': 'GE Profile',
    'kitchenaid': 'KitchenAid',
    'sub-zero': 'Sub-Zero',
    'jennair': 'JennAir',
    'u-line': 'U-Line',
    'fisher-paykel': 'Fisher & Paykel',
  };
  
  if (brandMap[slug]) return brandMap[slug];
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatApplianceName(slug: string): string {
  const applianceMap: { [key: string]: string } = {
    'refrigerator': 'Refrigerator',
    'washer': 'Washer',
    'dryer': 'Dryer',
    'dishwasher': 'Dishwasher',
    'oven': 'Oven/Stove',
    'range': 'Range',
    'cooktop': 'Cooktop',
    'freezer': 'Freezer',
    'range-hood': 'Range Hood',
    'ice-maker': 'Ice Maker',
    'coffee-machine': 'Coffee Machine',
    'double-oven': 'Built-In Oven',
  };
  
  return applianceMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

