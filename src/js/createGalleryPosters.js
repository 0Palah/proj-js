import templateContentList from '../templates/contentList.hbs';

export const createGalleryPosters = poster => {
  const {
    dates: {
      start: { localDate: data },
    },
    id,
    images,
    name,
    _embedded: { venues },
  } = poster;

  // console.log(venues[0]);

  const {
    address: { line1: address },
    city: { name: city },
    location: { longitude, latitude },
  } = venues[0];

  // console.log('images:', images);
  const image = [...images].sort((a, b) => b.height - a.height)[0].url;
  // console.log(image);

  console.log('\naddress:', address);
  console.log('city:', city);
  console.log('data:', data);
  console.log('id:', id);
  console.log('image:', image);
  console.log('name:', name);
  console.log('longitude:', longitude);
  console.log('latitude:', latitude);
  console.log('\n');

  const posterCard = {};

  posterCard.address = address;
  posterCard.city = city;
  posterCard.data = data;
  posterCard.id = id;
  posterCard.image = image;
  posterCard.name = name;
  posterCard.longitude = longitude;
  posterCard.latitude = latitude;

  return templateContentList(posterCard);
};
