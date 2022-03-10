import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import BlobAngel from "../../../assets/communityArt/167557771724587008_blob_angel.png";
import UnderWater from "../../../assets/communityArt/167557771724587008_under_water.png";
import BlobSnowFight from "../../../assets/communityArt/168141641973104641_blobsnowfight.gif";
import LinkHoldUpBlobHug from "../../../assets/communityArt/415288962387542046_linkholdupblobhug.png";
import PizzaServingBlob from "../../../assets/communityArt/152172291122266112_pizza_serving_blob.png"
import PlantBlob from "../../../assets/communityArt/152172291122266112_plant_blob.png";
import LinkBlob from "../../../assets/communityArt/415288962387542046_linkholdupblobhug.png";
import BlobBanSpace from "../../../assets/communityArt/223161712092774402_blob_ban_space.mp4";

const itemCss = {
  borderBottomRadius: 4,
  display: "block",
  width: "100%"
}

const communityData = [
  {
    image: BlobAngel,
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: UnderWater,
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: BlobSnowFight,
    author: {
      name: "Super from NonDescript™",
      discriminator: "5419",
      id: "168141641973104641"
    },
    type: "image"
  },
  {
    image: LinkHoldUpBlobHug,
    author: {
      name: "Nebuleon",
      discriminator: "7553",
      id: "415288962387542046"
    },
    type: "image"
  },
  {
    image: PizzaServingBlob,
    author: {
      name: "Sei",
      discriminator: "0006",
      id: "152172291122266112"
    },
    type: "image"
  },
  {
    image: PlantBlob,
    author: {
      name: "Sei",
      discriminator: "0006",
      id: "152172291122266112"
    },
    type: "image"
  },
  {
    image: LinkBlob,
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: BlobBanSpace,
    author: {
      name: "StahlFerro",
      discriminator: "0055",
      id: "223161712092774402"
    },
    type: "video"
  }
];

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0
}));

function CommunityWrapper() {
  return (
    <>
      {
        communityData.map((item, index) => (
          <div key={index}>
            <Label>{`${item.author.name}#${item.author.discriminator}`}</Label>
            {item.type === "image" ? (
              <img
                src={item.image}
                loading="lazy"
                style={itemCss}
                alt={`${item.author.name}#${item.author.discriminator}'s blob creation`}
              />
            ) : (
              <video
                src={item.image}
                controls
                autoPlay
                loop
                style={itemCss}
              />
            )}
          </div>
        ))
      }
    </>
  );
}

CommunityWrapper.whyDidYouRender = true;

export default CommunityWrapper;