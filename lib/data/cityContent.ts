// Unique, source-checked copy for the city pages that carry the most search
// impressions. Every other city keeps the shared template. Each block answers
// the queries that already rank the page (GSC, 09.09-06.10.2026); permit rules
// and cost ranges were checked against the sources listed per city.
// Only confirmed company facts are allowed here: licensed and insured, free
// on-site estimate, written warranty, $100 per day past the agreed deadline,
// 0% financing for 24 months. No project stories, counts or years in business.

export interface CityContent {
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
}

const cityContent: Record<string, CityContent> = {
  "renton": {
    intro: "Most kitchen remodels in Renton need at least one city permit, and the price depends more on whether the layout changes than on the finishes. Here is what to know about cost, permits and older Renton houses before you start.",
    sections: [
      {
        heading: "What a kitchen remodel costs in the Seattle area",
        paragraphs: [
          "The 2025 Cost vs Value Report prices defined kitchen projects for the Seattle market at about $32,000 for a midrange minor remodel (cabinets, counters, appliances and finishes refreshed in the same layout), about $96,000 for a midrange major remodel with new semi-custom cabinets and an island, and about $188,000 for an upscale major remodel.",
          "These are averages, not quotes; moving walls, plumbing or gas lines changes the number most, so TopVolk gives a written quote after a free on-site estimate.",
        ],
      },
      {
        heading: "Renton permits for kitchen and home remodels",
        paragraphs: [
          "Renton requires a building permit to alter a structure, plus separate permits for electrical, plumbing and mechanical work. Painting, tiling, carpeting, cabinets, countertops and similar finish work are exempt under Renton Municipal Code 4-5-060, as long as required accessible features are not changed.",
          "Applications start with an email to Renton Permit Services and are managed in the city's Civic Access Self-Service Portal. The city lists over-the-counter permits as typically same day and a first residential plan review as typically 2 to 3 weeks. Fairwood is outside city limits, so King County handles permits there, not Renton.",
        ],
      },
      {
        heading: "Older Renton homes: what to check first",
        paragraphs: [
          "The Renton Highlands grew from federal wartime housing that opened in 1942 for Boeing and Pacific Car and Foundry workers, and the Renton Housing Authority began selling Highlands homes to the public in 1949. Benson Hill joined the city in 2008. In any house built before 1978, work that disturbs paint must be done by a firm certified under Washington's lead-safe Renovation, Repair and Painting program.",
          "Puget Sound Clean Air Agency rules, repeated in Renton's remodel guidance, require checking the work area for asbestos before renovation. Older vinyl floor tile and mastic can contain it, so testing comes first.",
        ],
      },
      {
        heading: "How TopVolk works",
        paragraphs: [
          "TopVolk is a licensed and insured Washington general contractor owned by Vladislav Volkov. You get a free on-site estimate, a written warranty in the contract, $100 per day if work runs past the agreed deadline, and 0% financing for 24 months, subject to credit approval. Licensed subcontractors handle electrical and plumbing.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a kitchen remodel cost in Renton?",
        answer: "Seattle market averages run from about $32,000 for a minor refresh to about $96,000 for a midrange major remodel. You get an exact written quote after a free on-site estimate.",
      },
      {
        question: "Do I need a permit to remodel a kitchen in Renton?",
        answer: "Not for cabinets, countertops, tile or paint alone. You need permits once the project changes walls or includes plumbing, electrical or gas work.",
      },
      {
        question: "How long does a Renton building permit review take?",
        answer: "The city lists a first residential review as typically 2 to 3 weeks and revisions as 1 to 2 weeks.",
      },
      {
        question: "Do I need an asbestos test before remodeling in Renton?",
        answer: "Yes. Puget Sound Clean Air Agency rules require checking the work area for asbestos before renovation, and the City of Renton points to the same requirement.",
      },
    ],
  },
  "redmond": {
    intro: "For a home, bathroom or kitchen remodel in Redmond, the first question is which parts need a city permit. Below are Seattle-area costs, Redmond's permit rules and what older Redmond houses need.",
    sections: [
      {
        heading: "Bathroom and kitchen remodel costs in the Seattle area",
        paragraphs: [
          "The 2025 Cost vs Value Report prices a midrange bathroom remodel in the Seattle market (a 5 by 7 foot bath with every fixture replaced) at about $36,000 and an upscale bathroom remodel at about $107,000. For kitchens, the same report lists about $32,000 for a midrange minor remodel, about $96,000 for a midrange major remodel and about $188,000 for an upscale major remodel.",
          "These are averages, not quotes; moving plumbing, walls or wiring changes the number most, so TopVolk gives a written quote after a free on-site estimate.",
        ],
      },
      {
        heading: "Redmond permits for home, kitchen and bath remodels",
        paragraphs: [
          "Redmond treats minor remodeling, such as building or removing a wall, as an alteration that needs a building permit. A plumbing permit is required before a fixture is installed, altered or remodeled, and electrical and mechanical work have their own permits. Painting, papering, tiling, carpeting, cabinets, countertops and similar finish work are on the city's Work Exempt from Permit list.",
          "Plan-reviewed permits start with a Plan Review Online (PRO) request, and over-the-counter residential electrical, mechanical and plumbing permits are filed in the Redmond ePermitting Service (REPS). The city lists typical plan review for those trade permits at two weeks. Redmond Ridge is in unincorporated King County, so King County issues permits there.",
        ],
      },
      {
        heading: "Redmond housing: what older homes need",
        paragraphs: [
          "Redmond annexed Education Hill in 1951 and Overlake in 1962. Much of Education Hill's housing dates from the 1960s to the 1980s, while Redmond Ridge was built from 1998 onward. In any home built before 1978, renovation that disturbs paint must be done by a firm certified under Washington's Renovation, Repair and Painting program.",
          "Puget Sound Clean Air Agency rules require checking the work area for asbestos before renovation. Older vinyl floor tile and mastic can contain it, so testing comes first.",
        ],
      },
      {
        heading: "How TopVolk works",
        paragraphs: [
          "TopVolk is a licensed and insured Washington general contractor owned by Vladislav Volkov. You get a free on-site estimate, a written warranty in the contract, $100 per day if work runs past the agreed deadline, and 0% financing for 24 months, subject to credit approval. Licensed subcontractors handle electrical and plumbing.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a bathroom remodel cost in Redmond?",
        answer: "Seattle market averages are about $36,000 for a midrange bathroom remodel and about $107,000 for an upscale one. You get an exact written quote after a free on-site estimate.",
      },
      {
        question: "Do I need a permit to remodel a bathroom in Redmond?",
        answer: "Yes, once plumbing, wiring or walls change: Redmond requires a plumbing permit before a fixture is installed, altered or remodeled. Tile, paint, cabinets and countertops alone are exempt finish work.",
      },
      {
        question: "How much does a kitchen remodel cost in Redmond?",
        answer: "Seattle market averages run from about $32,000 for a minor kitchen refresh to about $96,000 for a midrange major remodel.",
      },
      {
        question: "Who issues remodel permits in Redmond Ridge?",
        answer: "King County, because Redmond Ridge is unincorporated. Education Hill and Overlake are inside city limits and go through the City of Redmond.",
      },
    ],
  },
  "lynnwood": {
    intro: "Most kitchen and bathroom remodels in Lynnwood need a city permit once plumbing, wiring or walls change, while new cabinets, countertops and tile on their own do not. Many Lynnwood homes date from the 1960s and 1970s, so plan for permit time, code updates and lead and asbestos checks before demolition starts.",
    sections: [
      {
        heading: "Kitchen and bathroom remodel costs and timelines",
        paragraphs: [
          "The 2025 Cost vs. Value report puts Seattle-area averages at about $32,000 for a midrange minor kitchen remodel, about $95,500 for a midrange major kitchen remodel and about $36,000 for a midrange bathroom remodel. Your price depends on size, finishes and whether plumbing or walls move, so TopVolk gives a written quote after a free on-site estimate.",
          "Industry guides put kitchen construction at about six to ten weeks and a full bathroom at four to eight weeks, plus design and permit time.",
        ],
      },
      {
        heading: "Remodel permits in Lynnwood",
        paragraphs: [
          "Lynnwood Development and Business Services issues remodel permits through the city's Online Permit Center. An interior remodel is a combo permit that covers building, plumbing and mechanical work. Electrical work needs its own permit, which the City of Lynnwood issues instead of Washington L&I. The city's posted estimate for a residential alteration is 1 to 2 weeks of processing plus 4 to 8 weeks for the first round of plan review.",
          "Painting, tiling, carpeting, cabinets and countertops are on the city's list of work exempt from a building permit. So are fixing a leak and clearing a clog, as long as pipes, valves or fixtures are not replaced or moved.",
        ],
      },
      {
        heading: "What Lynnwood's older homes mean for your remodel",
        paragraphs: [
          "Lynnwood grew out of the Alderwood Manor community and saw strong residential growth in the 1960s and 1970s. The city's housing element counts 46% of dwellings built in those two decades and a median year built of 1976, older than Snohomish County overall. In homes built before 1978, paid work that disturbs painted surfaces must follow the EPA's lead-safe rules, and the Puget Sound Clean Air Agency requires an asbestos check before most renovations.",
        ],
      },
      {
        heading: "How TopVolk works",
        paragraphs: [
          "TopVolk is a licensed and insured Washington general contractor owned by Vladislav Volkov. Every project starts with a free on-site estimate, and the contract includes a written warranty and $100 for each day the job runs past the agreed deadline. Electrical and plumbing work goes through licensed subcontractors, and 0% financing for 24 months is available (subject to credit approval).",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a permit to remodel my kitchen in Lynnwood, WA?",
        answer: "Yes, if you add or move plumbing, wiring or walls. Replacing cabinets, countertops, tile or paint alone is on Lynnwood's work-exempt list.",
      },
      {
        question: "How long does a remodel permit take in Lynnwood?",
        answer: "The city estimates 1 to 2 weeks of processing plus 4 to 8 weeks for the first plan review of a residential alteration.",
      },
      {
        question: "How much does kitchen and bathroom remodeling cost in Lynnwood, WA?",
        answer: "2025 Seattle-area averages are about $32,000 for a minor kitchen remodel, about $95,500 for a midrange major kitchen remodel and about $36,000 for a midrange bathroom. Your exact price comes in a written quote after a free on-site estimate.",
      },
      {
        question: "Who issues electrical permits in Lynnwood?",
        answer: "The City of Lynnwood issues its own electrical permits and inspections, not Washington L&I. Electrical work is permitted separately from the combo building permit.",
      },
    ],
  },
  "woodinville": {
    intro: "A whole-home renovation in Woodinville usually involves a city building permit, a separate state electrical permit and, on some lots, a septic review. A bathroom remodel on its own follows the same rules.",
    sections: [
      {
        heading: "Whole-home and bathroom renovation costs and timelines",
        paragraphs: [
          "A whole-home renovation has no single price because it is the sum of the rooms and systems in scope. The 2025 Cost vs. Value report puts Seattle-area averages at about $36,000 for a midrange bathroom remodel, about $107,000 for an upscale bathroom, about $95,500 for a midrange major kitchen remodel and about $68,000 for a basement remodel. TopVolk prices your project in a written quote after a free on-site estimate.",
          "Industry guides put bathroom construction at about four to eight weeks and kitchen construction at six to ten weeks, plus design and permit time.",
        ],
      },
      {
        heading: "Renovation permits in Woodinville",
        paragraphs: [
          "Woodinville Development Services takes applications through its online Permit Portal. Residential work uses a Combined Building Permit that covers building, plumbing and mechanical work. The city does not issue electrical permits; those come from Washington L&I. The city lists 2 to 5 weeks of review for a single-family addition or alteration.",
          "You need a building permit for new walls, converting a basement or garage into living space, and installing or moving an exterior door, window or skylight. Interior finish work such as painting, tiling, carpeting, cabinets and countertops does not need one.",
        ],
      },
      {
        heading: "Septic, county lines and Woodinville homes",
        paragraphs: [
          "Only part of Woodinville gets sewer service from the Woodinville Water District. Homes without sewer use on-site septic systems, and Seattle and King County Public Health approval is required before the city issues many building permits. Hollywood Hill and some other Woodinville addresses sit in unincorporated King or Snohomish County, where the county handles permits.",
          "Inside city limits only 20% of homes were built before 1970. In homes built before 1978, EPA lead-safe rules apply to work that disturbs paint, and the Puget Sound Clean Air Agency requires an asbestos check before most renovations.",
        ],
      },
      {
        heading: "How TopVolk works",
        paragraphs: [
          "TopVolk is a licensed and insured Washington general contractor owned by Vladislav Volkov. Every project starts with a free on-site estimate, and the contract includes a written warranty and $100 for each day the job runs past the agreed deadline. Electrical and plumbing work goes through licensed subcontractors, and 0% financing for 24 months is available (subject to credit approval).",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a permit for a bathroom remodel in Woodinville?",
        answer: "Not for tile, cabinets, countertops or paint alone. New walls and new or moved plumbing need a permit, and simple fixture replacements such as a water heater can get a plumbing permit over the counter.",
      },
      {
        question: "How long does a home renovation permit take in Woodinville, WA?",
        answer: "The city lists 2 to 5 weeks of review for a single-family addition or alteration.",
      },
      {
        question: "Is my Woodinville home on sewer or septic?",
        answer: "Only part of the city has sewer from the Woodinville Water District. If your home is on septic, King County Public Health approval may be required before the city issues a building permit.",
      },
      {
        question: "How much does home remodeling cost in Woodinville?",
        answer: "2025 Seattle-area averages run about $36,000 for a midrange bathroom and about $95,500 for a midrange major kitchen, and your exact price comes in a written quote after a free on-site estimate.",
      },
    ],
  },
  "maple-valley": {
    intro: "Most Maple Valley homes were built in the 1990s and 2000s, so a kitchen remodel here usually means updating a kitchen from that era. Here are Seattle-area cost benchmarks, the city's permit rules and what to check first. Your actual price comes as a written quote after a free on-site estimate.",
    sections: [
      {
        heading: "Kitchen remodel cost in the Seattle area",
        paragraphs: [
          "Remodeling magazine's 2025 Cost vs. Value report prices kitchen projects for the Seattle market at about $32,000 for a midrange minor remodel (cabinets, counters, appliances and finishes refreshed in the same layout) and about $96,000 for a midrange major remodel with new cabinets and an island. These are averages, not quotes.",
          "In a 1990s or 2000s Maple Valley kitchen the biggest cost driver is whether the layout changes: moving the sink, opening a wall or adding a window adds trades and a building permit. We price each kitchen as a written quote after a free on-site estimate.",
        ],
      },
      {
        heading: "Kitchen remodel permits in Maple Valley",
        paragraphs: [
          "The City of Maple Valley requires a building permit when a remodel involves structural members, adding or removing doors or windows, building or removing interior walls, replacing sheetrock, or relocating plumbing or mechanical fixtures. Installing or replacing a fuel-burning appliance and replacing windows also need a permit. No permit is needed to paint, wallpaper, lay carpet or vinyl flooring, install cabinets and do other finish work, or replace plumbing fixtures on the existing piping and traps.",
          "Applications go only through the city's online permit portal, and the city publishes no review time. Electrical permits come from the Washington State Department of Labor & Industries, not the city. Not every Maple Valley address is inside city limits; homes in unincorporated King County get permits from King County.",
        ],
      },
      {
        heading: "What Maple Valley's housing means for your kitchen",
        paragraphs: [
          "Census estimates put the median year built for Maple Valley homes at 2001, and about 6 in 10 homes were built between 1990 and 2009. In a kitchen of that age, keeping the layout and replacing cabinets and finishes usually stays off the permit list, while opening a wall to the family room, adding a window or moving the sink to an island puts the project under a building permit.",
        ],
      },
      {
        heading: "How TopVolk works",
        paragraphs: [
          "TopVolk is a licensed and insured Washington general contractor owned by Vladislav Volkov. Every project starts with a free on-site estimate. The contract includes a written warranty and $100 per day past the agreed deadline, and 0% financing is available for 24 months (subject to credit approval). Electrical and plumbing work goes through licensed subcontractors.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a permit for a kitchen remodel in Maple Valley WA?",
        answer: "Only if the work goes beyond finishes. Removing or building walls, replacing sheetrock, moving plumbing or mechanical fixtures, or changing doors and windows needs a city building permit, while new cabinets, flooring and paint do not.",
      },
      {
        question: "How much does a kitchen remodel cost in Maple Valley?",
        answer: "Seattle market averages from the 2025 Cost vs. Value report run from about $32,000 for a minor kitchen refresh to about $96,000 for a midrange major remodel. Your price comes as a written quote after a free on-site estimate.",
      },
    ],
  },
  "sumner": {
    intro: "For a basement, bathroom or whole-home remodel in Sumner, here are cost benchmarks, the city's permit rules, and what the valley's flood maps and groundwater mean for basements. Your actual price comes as a written quote after a free on-site estimate.",
    sections: [
      {
        heading: "Basement and bathroom remodel costs",
        paragraphs: [
          "Remodeling magazine's 2025 Cost vs. Value report puts Seattle-area averages at about $68,000 for a basement remodel, about $36,000 for a midrange bathroom remodel and about $107,000 for an upscale one. These are averages, not quotes.",
          "In Sumner, moisture control below grade and any floodplain requirements can change a basement budget more than finishes do, so every project is priced as a written quote after a free on-site estimate.",
        ],
      },
      {
        heading: "Remodel permits in Sumner",
        paragraphs: [
          "Sumner requires a permit for any work on load-bearing supports, changes to the building envelope, and work that reduces egress, light, ventilation or fire resistance, no matter how small. A bathroom remodel may also need a plumbing permit. You usually do not need one for painting, installing cabinets, replacing flooring, paneling over existing walls and ceilings, same-size window or door replacement, or replacing an electric water heater or furnace. Gas appliance replacements do.",
          "You apply and schedule inspections through the city's Self Service online portal. Electrical work is permitted and inspected by the Washington State Department of Labor & Industries. Permits expire 180 days after issuance or the last approved inspection. The city publishes no review time.",
        ],
      },
      {
        heading: "Basements in the Puyallup River valley",
        paragraphs: [
          "Sumner uses FEMA's 2017 Flood Insurance Rate Map. Building in a mapped special flood hazard area requires a floodplain development permit. If a project costs 50% or more of the structure's market value, the city's flood code treats it as a substantial improvement, and the lowest floor, including a basement, must sit at least one foot above base flood elevation. Check your address on FEMA's Flood Map Service Center first.",
          "State geologists note that low spots on the valley floor, especially old Puyallup and White river channels, are likely to have a shallow groundwater table. Plan moisture control before finishing basement walls.",
        ],
      },
      {
        heading: "Older Sumner homes and whole-home remodels",
        paragraphs: [
          "Census estimates show about one in eight Sumner homes were built before 1940 and about a quarter before 1960. For a whole-home remodel, Sumner does not require bringing untouched parts of the house up to current code, but any structural effects of the new work must be covered in the design. Adding living space can also trigger sidewalk requirements on lots built in the county and later annexed into Sumner.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a permit to finish a basement in Sumner WA?",
        answer: "Usually yes. Sumner's exemptions cover finishes over existing walls, not new framing, and new wiring needs an L&I electrical permit. If the home is in a mapped flood zone, a floodplain development permit applies too.",
      },
      {
        question: "Do I need a permit for a bathroom remodel in Sumner?",
        answer: "New flooring, paint and cabinets usually do not. Moving plumbing, changing walls or touching load-bearing framing does, often with a plumbing permit.",
      },
      {
        question: "How much does a basement remodel cost in Sumner?",
        answer: "The 2025 Cost vs. Value Seattle-area average for a basement remodel is about $68,000. Your price comes as a written quote after a free on-site estimate.",
      },
    ],
  },
};

export function getCityContent(slug: string): CityContent | undefined {
  return cityContent[slug];
}
