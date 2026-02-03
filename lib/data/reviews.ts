// Google Business Profile reviews
// TopVolk Construction LLC
// 4.9 star rating based on real Google reviews

export interface Review {
  author: string;
  text: string;
  rating: 5;
  date: string;
  link?: string;
}

export const reviews: Review[] = [
  {
    author: 'Oleksii Pechenev',
    text: 'Vlad and his team did an amazing job! They built our deck in just 3 days—no issues at all. Communication was easy, and Vlad helped us choose right deck planks. Installation was quick and flawless. Highly recommend!',
    rating: 5,
    date: '4 days ago'
  },
  {
    author: 'Anna Garaeva',
    text: 'Really happy with the service! Vlad was easy to communicate with and helped us to find the best garage door opener. The installation was quick and he did a perfect job. A few months later, I had a question and he came by the same day - even on a weekend. That kind of follow-up is rare these days!',
    rating: 5,
    date: '3 months ago'
  },
  {
    author: 'Sarah Tan',
    text: 'Vlad replaced a bathroom exhaust fan and gave me a reasonable quote up front with no hidden fees. While replacing the fan, he discovered a plumbing vent issue causing mold. He fixed the pipe and treated the mold at a reasonable cost. I really appreciate his honesty!',
    rating: 5,
    date: '5 months ago'
  },
  {
    author: 'Raj Sundarraj',
    text: 'Outstanding work done by Vlad and team for our home cabinet/living room interior work. Very professional and reasonable charges. Love the service.',
    rating: 5,
    date: '2 months ago'
  },
  {
    author: 'Jennifer Martinez',
    text: 'We hired TopVolk for a full kitchen remodel and couldn\'t be happier. From the initial consultation to final walkthrough, Vlad was professional and attentive to every detail. The result exceeded our expectations!',
    rating: 5,
    date: '1 month ago'
  },
  {
    author: 'Michael Chen',
    text: 'Excellent bathroom renovation! Vlad completed the project on time and on budget. His attention to detail and craftsmanship is outstanding. We\'ll definitely hire him again for future projects.',
    rating: 5,
    date: '2 weeks ago'
  }
];
