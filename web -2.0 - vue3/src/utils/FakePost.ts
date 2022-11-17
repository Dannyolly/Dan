
// import { FormattedPost } from '@/types/post';
// import {  faker } from '@faker-js/faker';
// import { Random } from './Num';

// export  function loadData(length:number){
//     let temp = [] as FormattedPost[]
//     for (let i = 0; i < length; i++) {
//        let ch = [faker.image.fashion(640,400,true),faker.image.city(640,400,true),faker.image.food(640,400,true)]
//         temp.push({
//             id: i,
//             introduction: faker.lorem.sentences(),
//             userId: i,
//             likeCount: Random(0, 300),
//             postDate: new Date(),
//             userInfo: {
//                 id: i,
//                 cid: i,
//                 introduction: faker.lorem.sentences(),
//                 online: 1,
//                 password: '123',
//                 qrcode: '',
//                 username: faker.name.firstName( i%2==0?'female':'male'),
//                 backgroundImage: faker.image.fashion(),
//                 icon: faker.image.avatar()
//             },
//             postImage: [ ch[i%3] ]
            
//         }) 
//     }
//     return temp;
// }