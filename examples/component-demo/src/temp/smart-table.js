// import React, { useState, useEffect } from 'react'
// // import { SmartTable } from '@maker-ui/smart-table'

// const columns = [
//   {
//     Header: 'TV Show',
//     columns: [
//       {
//         Header: 'Name',
//         accessor: 'show.name',
//       },
//       {
//         Header: 'Type',
//         accessor: 'show.type',
//       },
//     ],
//   },
//   {
//     Header: 'Details',
//     columns: [
//       {
//         Header: 'Language',
//         accessor: 'show.language',
//       },
//       {
//         Header: 'Genre(s)',
//         accessor: 'show.genres',
//       },
//       {
//         Header: 'Runtime',
//         accessor: 'show.runtime',
//         Cell: ({ cell: { value } }) => {
//           const hour = Math.floor(value / 60)
//           const min = Math.floor(value % 60)
//           return (
//             <>
//               {hour > 0 ? `${hour} hr${hour > 1 ? 's' : ''} ` : ''}
//               {min > 0 ? `${min} min${min > 1 ? 's' : ''}` : ''}
//             </>
//           )
//         },
//       },
//       {
//         Header: 'Status',
//         accessor: 'show.status',
//       },
//     ],
//   },
// ]

// const data = [
//   {
//     score: 18.01586,
//     show: {
//       id: 44813,
//       url: 'http://www.tvmaze.com/shows/44813/the-snow-spider',
//       name: 'The Snow Spider',
//       type: 'Scripted',
//       language: 'English',
//       genres: ['Drama', 'Fantasy'],
//       status: 'Running',
//       runtime: 30,
//       premiered: '2020-03-29',
//       officialSite: 'https://www.bbc.co.uk/programmes/m000gx2x',
//       schedule: { time: '18:05', days: ['Sunday'] },
//       rating: { average: null },
//       weight: 100,
//       network: {
//         id: 60,
//         name: 'CBBC',
//         country: {
//           name: 'United Kingdom',
//           code: 'GB',
//           timezone: 'Europe/London',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: null, imdb: null },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/248/622140.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/248/622140.jpg',
//       },
//       summary:
//         '<p><b>The Snow Spider</b> opens with Gwyn Griffiths gloomily awaiting the day of his ninth birthday, an occasion marred once again by the reminder of his missing sister Bethan, who disappeared four years earlier. Little does he know his life is about to be changed forever.</p>',
//       updated: 1586778105,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/44813' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/1835329' },
//         nextepisode: { href: 'http://api.tvmaze.com/episodes/1835337' },
//       },
//     },
//   },
//   {
//     score: 15.48107,
//     show: {
//       id: 10412,
//       url: 'http://www.tvmaze.com/shows/10412/snow',
//       name: 'Snow',
//       type: 'Scripted',
//       language: 'English',
//       genres: ['Comedy', 'Family', 'Fantasy'],
//       status: 'Ended',
//       runtime: 120,
//       premiered: '2004-12-13',
//       officialSite: 'http://abcfamily.go.com/movies/listing/snow',
//       schedule: { time: '20:00', days: ['Sunday'] },
//       rating: { average: null },
//       weight: 1,
//       network: {
//         id: 26,
//         name: 'FreeForm',
//         country: {
//           name: 'United States',
//           code: 'US',
//           timezone: 'America/New_York',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: null, imdb: 'tt0425468' },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/35/88041.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/35/88041.jpg',
//       },
//       summary:
//         "<p><b>Snow</b> is an American Christmas-themed film starring Tom Cavanagh and Ashley Williams that premiered in 2004 on the ABC television network, and was also shown on the ABC Family cable network later the same year. It was written by Rich Burns and directed by Alex Zamm. Since 2004, Snow has become a staple on ABC Family's annual 25 Days of Christmas programming block. The sequel, <i>Snow 2: Brain Freeze</i>, was released on December 14, 2008 as part of ABC Family's 25 Days of Christmas. The main cast from the first film reprise their roles in the sequel.</p>",
//       updated: 1503125327,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/10412' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/537594' },
//       },
//     },
//   },
//   {
//     score: 13.364219,
//     show: {
//       id: 43804,
//       url: 'http://www.tvmaze.com/shows/43804/relentless-with-kate-snow',
//       name: 'Relentless with Kate Snow',
//       type: 'Documentary',
//       language: 'English',
//       genres: [],
//       status: 'Running',
//       runtime: 60,
//       premiered: '2019-10-04',
//       officialSite: 'https://www.oxygen.com/relentless-with-kate-snow',
//       schedule: { time: '20:00', days: ['Friday'] },
//       rating: { average: null },
//       weight: 88,
//       network: {
//         id: 79,
//         name: 'Oxygen',
//         country: {
//           name: 'United States',
//           code: 'US',
//           timezone: 'America/New_York',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: 369870, imdb: null },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/211/529851.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/211/529851.jpg',
//       },
//       summary:
//         "<p><b>Relentless with Kate Snow</b> will take viewers on an emotional journey with grieving families as they work tirelessly, often putting their own lives in danger, to find the culprits responsible for the deaths of those they loved most. Their relentless pursuit of justice paired with the opportunity to work alongside law enforcement creates a powerful and dynamic force that won't rest until due process is served. From a mother dedicated to putting her son's killer behind bars after he's gunned down at a recording studio to a twenty-year search for a victim's killer that was so aggressive it transformed an unsolved, cold case into an active investigation, the series will reveal gripping firsthand accounts from the families who will stop at nothing to get the justice the victims deserve.</p>",
//       updated: 1574615948,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/43804' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/1757262' },
//       },
//     },
//   },
//   {
//     score: 12.996723,
//     show: {
//       id: 33029,
//       url: 'http://www.tvmaze.com/shows/33029/snow-blind',
//       name: 'Snow Blind',
//       type: 'Scripted',
//       language: 'English',
//       genres: ['Drama'],
//       status: 'In Development',
//       runtime: 60,
//       premiered: null,
//       officialSite: null,
//       schedule: { time: '', days: [] },
//       rating: { average: null },
//       weight: 0,
//       network: {
//         id: 4,
//         name: 'FOX',
//         country: {
//           name: 'United States',
//           code: 'US',
//           timezone: 'America/New_York',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: null, imdb: null },
//       image: null,
//       summary:
//         '<p><strong>Snow Blind</strong> centers on Sheriff Billy Bowden, who, after a local \nstory on him goes viral, struggles to keep his past life of crime and \nhis placement in witness protection hidden from his friends and family \nin a small Alaska town.</p>',
//       updated: 1509449573,
//       _links: { self: { href: 'http://api.tvmaze.com/shows/33029' } },
//     },
//   },
//   {
//     score: 12.938968,
//     show: {
//       id: 32367,
//       url: 'http://www.tvmaze.com/shows/32367/snow-crash',
//       name: 'Snow Crash',
//       type: 'Scripted',
//       language: 'English',
//       genres: ['Drama', 'Science-Fiction'],
//       status: 'In Development',
//       runtime: 60,
//       premiered: null,
//       officialSite: null,
//       schedule: { time: '', days: [] },
//       rating: { average: null },
//       weight: 72,
//       network: null,
//       webChannel: {
//         id: 329,
//         name: 'HBO Max',
//         country: {
//           name: 'United States',
//           code: 'US',
//           timezone: 'America/New_York',
//         },
//       },
//       externals: { tvrage: null, thetvdb: null, imdb: 'tt2224100' },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/233/584738.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/233/584738.jpg',
//       },
//       summary:
//         "<p><b>Snow Crash</b> is a science fiction drama based on Neal Stephenson's novel, which is set in futuristic America. In reality, Hiro Protagonist delivers pizza for Uncle Enzo's CosoNostra Pizza Inc., but in the Metaverse he's a warrior prince. Plunging headlong into the enigma of a new computer virus that's striking down hackers everywhere, he races along the neon-lit streets on a search-and-destroy mission for the shadowy virtual villain.</p>",
//       updated: 1578002683,
//       _links: { self: { href: 'http://api.tvmaze.com/shows/32367' } },
//     },
//   },
//   {
//     score: 12.556611,
//     show: {
//       id: 45215,
//       url: 'http://www.tvmaze.com/shows/45215/tutankhamun-with-dan-snow',
//       name: 'Tutankhamun with Dan Snow',
//       type: 'Documentary',
//       language: 'English',
//       genres: [],
//       status: 'To Be Determined',
//       runtime: 60,
//       premiered: '2019-11-26',
//       officialSite: 'https://www.channel5.com/show/tutankhamun-with-dan-snow',
//       schedule: { time: '21:00', days: ['Tuesday', 'Wednesday', 'Thursday'] },
//       rating: { average: null },
//       weight: 92,
//       network: {
//         id: 135,
//         name: 'Channel 5',
//         country: {
//           name: 'United Kingdom',
//           code: 'GB',
//           timezone: 'Europe/London',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: null, imdb: null },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/228/570030.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/228/570030.jpg',
//       },
//       summary:
//         "<p>Dan Snow explores the story of the Egyptian pharaoh's life and death, and the discovery of his tomb, assisted by journalist John Sergeant and archaeologist Raksha Dave. </p>",
//       updated: 1576362705,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/45215' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/1764581' },
//       },
//     },
//   },
//   {
//     score: 11.787515,
//     show: {
//       id: 14031,
//       url: 'http://www.tvmaze.com/shows/14031/snow-babies',
//       name: 'Snow Babies',
//       type: 'Documentary',
//       language: 'English',
//       genres: ['Nature'],
//       status: 'Ended',
//       runtime: 60,
//       premiered: '2012-12-19',
//       officialSite: 'http://www.bbc.co.uk/programmes/p0118wxq',
//       schedule: { time: '22:00', days: ['Wednesday'] },
//       rating: { average: null },
//       weight: 0,
//       network: {
//         id: 12,
//         name: 'BBC One',
//         country: {
//           name: 'United Kingdom',
//           code: 'GB',
//           timezone: 'Europe/London',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: 265006, imdb: null },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/48/120185.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/48/120185.jpg',
//       },
//       summary:
//         '<p>The heart-warming tale of a special group of baby animals born in some of the coldest and harshest places on Earth. We follow the ups and downs of impossibly cute yet plucky baby emperor penguins, snow monkeys, polar bears, arctic foxes, reindeer and otters and find out just what it takes to survive the first year of life in a world of snow and ice, with a little help from family and friends.</p>',
//       updated: 1503125833,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/14031' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/646568' },
//       },
//     },
//   },
//   {
//     score: 11.787515,
//     show: {
//       id: 12393,
//       url: 'http://www.tvmaze.com/shows/12393/snow-white',
//       name: 'Snow White',
//       type: 'Scripted',
//       language: 'Korean',
//       genres: ['Drama', 'Comedy', 'Romance'],
//       status: 'Ended',
//       runtime: 60,
//       premiered: '2004-03-15',
//       officialSite: 'http://www.kbs.co.kr/drama/snowhite/',
//       schedule: { time: '21:55', days: ['Monday', 'Tuesday'] },
//       rating: { average: null },
//       weight: 0,
//       network: {
//         id: 128,
//         name: 'KBS2',
//         country: {
//           name: 'Korea, Republic of',
//           code: 'KR',
//           timezone: 'Asia/Seoul',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: 244591, imdb: 'tt1186855' },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/42/105688.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/42/105688.jpg',
//       },
//       summary:
//         "<p>Ma Young Hee has been in love with her best friend Han Jin Woo since the first time they met in high school. Han Jin Woo, on the other hand, does not see Young Hee's love for him and blindly goes out with other girls in front of her. On a trip to Japan, Young Hee meets a young man on the street who takes her back to his apartment since she is drunk. Young Hee accuses this man of raping her even though he didn't, but before she can rightfully press charges, he runs away as the government officials of Japan chase him down for an expired visa. Upon returning to Korea, Jin Woo stops by her apartment and introduces his younger brother, Han Sun Woo who just happens to be the young man she met in Japan. Jin Woo asks if Sun Woo may stay at her place, and Young Hee accepts out of love for Jin Woo. The story unfolds as a sudden high school classmate of Young Hee, Jang Hee Won, begins to court Jin Woo.</p>",
//       updated: 1463583608,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/12393' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/591202' },
//       },
//     },
//   },
//   {
//     score: 11.787515,
//     show: {
//       id: 37282,
//       url: 'http://www.tvmaze.com/shows/37282/snow-flower',
//       name: 'Snow Flower',
//       type: 'Scripted',
//       language: 'Korean',
//       genres: ['Drama', 'Romance'],
//       status: 'Ended',
//       runtime: 60,
//       premiered: '2006-11-20',
//       officialSite: null,
//       schedule: { time: '21:55', days: ['Monday', 'Tuesday'] },
//       rating: { average: null },
//       weight: 0,
//       network: {
//         id: 127,
//         name: 'SBS',
//         country: {
//           name: 'Korea, Republic of',
//           code: 'KR',
//           timezone: 'Asia/Seoul',
//         },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: 281773, imdb: null },
//       image: null,
//       summary:
//         "<p>When she was young, Yoo Da Mi was forced to move in with her grandmother. Unknowingly, it was then when her father disappeared from her life, and since then, she had always thought that her father was dead. As time wore on, her mother became one of the country's best-selling authors, but due to this, she had never found the time to be with her daughter. Suddenly, one day, Da Mi accidentally intercepts a phone call from her father and realizes that her mother has lied to her about her father's whereabouts. Angry, Da Mi decides to infuriate her mother by deciding to not to attend university and chooses to become an actress instead. Surprisingly, the first film she stars in is based on one of her mother's novels. Meanwhile, Ha Yeong Chan - her boss's step-brother - is a friend who secretly loves Da Mi though gets turned away by her.</p>",
//       updated: 1529953902,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/37282' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/1485196' },
//       },
//     },
//   },
//   {
//     score: 11.787515,
//     show: {
//       id: 37320,
//       url: 'http://www.tvmaze.com/shows/37320/summer-snow',
//       name: 'Summer Snow',
//       type: 'Scripted',
//       language: 'Japanese',
//       genres: ['Drama', 'Romance'],
//       status: 'Ended',
//       runtime: 60,
//       premiered: '2000-07-07',
//       officialSite: null,
//       schedule: { time: '21:00', days: ['Friday'] },
//       rating: { average: null },
//       weight: 0,
//       network: {
//         id: 159,
//         name: 'TBS',
//         country: { name: 'Japan', code: 'JP', timezone: 'Asia/Tokyo' },
//       },
//       webChannel: null,
//       externals: { tvrage: null, thetvdb: 84810, imdb: 'tt0281240' },
//       image: {
//         medium:
//           'http://static.tvmaze.com/uploads/images/medium_portrait/159/398587.jpg',
//         original:
//           'http://static.tvmaze.com/uploads/images/original_untouched/159/398587.jpg',
//       },
//       summary:
//         '<p>A love story between a young man who has been forced to grow up too quickly, and a young woman with an ailment that has placed restrictions on her life. Natsuo has been looking after his younger brother and sister since the death of their parents. He has also been running the family bicycle shop. Yuki becomes the only person in the world in whom he can confide. For Yuki, Natsuo becomes the catalyst that has her trying to break out of her cocoon.</p>',
//       updated: 1577285458,
//       _links: {
//         self: { href: 'http://api.tvmaze.com/shows/37320' },
//         previousepisode: { href: 'http://api.tvmaze.com/episodes/1485793' },
//       },
//     },
//   },
// ]

// const TablePage = () => {
//   const select = row => {
//     console.log(row)
//   }

//   return (
//     <React.Fragment>
//       {/* <SmartTable columns={columns} data={data} onRowSelect={select} /> */}
//     </React.Fragment>
//   )
// }

// export default TablePage
