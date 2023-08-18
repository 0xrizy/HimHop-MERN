import React from 'react';
import './CSS/Picks.css'; // Create this CSS file for styling
import { useState } from 'react';
import { Link } from 'react-router-dom';

const districts = [
  { name: 'Shimla', image: 'https://static.toiimg.com/photo/msid-102383896,width-96,height-65.cms', place_id:"5125805138f14a5340591acbaabea91a3f40f00103f9011024dc1200000000c002079203065368696d6c61" },
  { name: 'Kullu', image: 'https://www.seleqtionshotels.com/content/dam/seleqtions/en/in/our-hotels/baragarh-resort/16x7/manali-destination.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg', place_id:"511af2199afc4b534059e55d6d426b1f4040f00103f901de32a60e000000009203064d616e616c69" },
  { name: 'Kangra', image: 'https://himachaltourism.gov.in/wp-content/uploads/2019/04/Dhauladhar-Kangra.jpg', place_id :"51d9d770476e115340596e8d637f340d4040f00103f901ef32a60e00000000c002079203064b616e677261"},
  { name: 'Chamba', image: 'https://static.toiimg.com/photo/msid-102383896,width-96,height-65.cms', place_id:"511226d6f3ff07534059ac4a6c883b474040f00103f901709ed71100000000c002079203064368616d6261" },
  { name: 'Mandi', image: 'https://w0.peakpx.com/wallpaper/726/141/HD-wallpaper-himachal-pradesh-mandi-mountains-nature.jpg', place_id:"5162a7b3ee7a3b53405942ddf6f35cb53f40f00103f901aa173b7000000000c002079203054d616e6469" },
  { name: 'Solan', image: 'https://media.istockphoto.com/id/1133995766/photo/residential-district.jpg?s=612x612&w=0&k=20&c=AM5YhTHjy_3CsuOBUep5UeSbwqy3uRvfH0pMkil_4uY=', place_id:"51927e09ef734453405944dba8b094ea3e40f00101f901804c980000000000c00209920305536f6c616e" },
  { name: 'Kinnaur', image: 'https://static.toiimg.com/thumb/msid-92249469,width-748,height-499,resizemode=4,imgsize-206876/.jpg', place_id:"51edd5c7435f945340599296259584873f40f00102f901d7c9d43000000000c0020492030f4b696e6e617572204b61696c617368" },
  { name: 'Una', image: 'https://mediaim.expedia.com/destination/1/b8f60d4bdb145d490fc63e887f3207eb.jpg', place_id:"51b813364d69115340599c7d2fcf94773f40f00103f901401b818c00000000c00207920303556e61"},
];

const Picks = ({selectedPlaceId={selectedPlaceId}, setSelectedPlaceId={setSelectedPlaceId}}) => {

  
    const handleExploreClick = (placeId) => {
      setSelectedPlaceId(placeId);
    };
  
    return (
    <div>
        <h1 className='hd1'>Explore</h1>
      <div className="picks-container">
        <div className="background-image"></div>
        {districts.map((district, index) => (
          <div key={index} className="card">
            <img src={district.image} alt={district.name} />
            <h3>{district.name}</h3>
            {/* Use Link to navigate to the Results component */}
            <Link to={`/results/${district.place_id}`}>
              <button onClick={() => handleExploreClick(district.place_id)}>Explore</button>    
            </Link>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default Picks;
