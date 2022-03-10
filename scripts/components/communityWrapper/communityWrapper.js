import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const itemCss = {
  borderBottomRadius: 4,
  display: "block",
  width: "100%"
}

const communityData = [
  {
    image: "https://cdn.discordapp.com/attachments/900292457370095656/900292521496821820/unknown.png",
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: "https://cdn.discordapp.com/attachments/900292457370095656/905023050246942720/image0.png",
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: "https://cdn.discordapp.com/attachments/900292457370095656/913399559676370944/blobsnowfight.gif",
    author: {
      name: "Super from NonDescript™",
      discriminator: "5419",
      id: "168141641973104641"
    },
    type: "image"
  },
  {
    image: "https://cdn.discordapp.com/attachments/900292457370095656/911560865176752138/linkholdupblobhug.png",
    author: {
      name: "Nebuleon",
      discriminator: "7553",
      id: "415288962387542046"
    },
    type: "image"
  },
  {
    image: "https://cdn.discordapp.com/attachments/900292457370095656/910468779283214336/unknown-28.png",
    author: {
      name: "Sei",
      discriminator: "0006",
      id: "152172291122266112"
    },
    type: "image"
  },
  {
    image: "https://cdn.discordapp.com/attachments/289482554250100736/944783079766118420/unknown.png",
    author: {
      name: "Sei",
      discriminator: "0006",
      id: "152172291122266112"
    },
    type: "image"
  },
  {
    image: "https://media.discordapp.net/attachments/427569822075846658/951048024933670912/blobs.png",
    author: {
      name: "Itaywex",
      discriminator: "0001",
      id: "167557771724587008"
    },
    type: "image"
  },
  {
    image: "https://i.imgur.com/V4TVpbC.mp4",
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