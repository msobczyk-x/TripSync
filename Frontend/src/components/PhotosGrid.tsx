import { Button, Flex, Heading, Image, Modal, Pressable, Text } from 'native-base'
import React, {useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Crypto from 'expo-crypto';

const PhotosGrid = ({trip, user, role}:any) => {

    const [images, setImages] = React.useState<any>([]);
    const [imagesLoading, setImagesLoading] = React.useState(true);
    const [isModalOpen, setisModalOpen] = React.useState(false);
    const [modalImage, setModalImage] = React.useState<any>();
  
    const pickImage = async () => {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });
      console.log(result);
      if (!result.canceled) {
        setImages([...images, {
          url: result.assets[0].uri,
          first_name: user.first_name,
          last_name: user.last_name,
          file_name: result.assets[0].name,
        }]);
        uploadImage(result.assets[0].uri);
      }
    };
  
    useEffect(() => {
      (async () => {
        axios
          .get(`http://192.168.1.24:3000/api/getTripPhotos/${trip._id}`)
          .then((res) => {
            setImages(res.data);
            console.log(res.data);
            setImagesLoading(false);
          });
      })();
    }, []);
  
    const uploadImage = async (uri: any) => {
      const data = new FormData();
      data.append("photo", {
        uri,
        name: Crypto.randomUUID(),
        type: "image/jpeg",
      } as unknown as Blob);
  
      try {
        
        const response = await axios.post(
          `http://192.168.1.24:3000/api/uploadTripPhoto/${trip._id}/${user._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <Flex marginBottom={100}>
    <Flex
      direction="row"
      alignItems={"center"}
      justifyContent={"space-between"}
      marginBottom={4}
    >
      <Heading>Photos</Heading>
      <Button onPress={pickImage}>Add</Button>
    </Flex>
    <Flex
      direction="row"
      flexWrap={"wrap"}
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        
      }}
    >
      {imagesLoading ? (
        <Text>Loading...</Text>
      ) : images.length != 0 ? (
        images.map((image: any, index: any) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                setisModalOpen(true);
                setModalImage(image);
              }}
            >
              <Image
                source={{ uri: image.url }}
                style={{ width: 100, height: 100}}
                alt="Image"
              />
            </Pressable>
          );
        })
      ) : (
        <Text textAlign={"center"}>No photos</Text>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setisModalOpen(false);
        }}
        size={"lg"}
      >
        <Modal.Content maxWidth={"400"}>
        
  
          <Modal.Body>
           
      <Image source={{ uri: modalImage?.url }} alt="Image" maxW={400} maxH={400} minH={300} minW={300}/>
          </Modal.Body>
          <Modal.Footer justifyContent={"space-between"} alignItems={"center"}>
            {role == "Teacher" && (
              <Button bgColor={"danger.500"} onPress={()=> {
                axios.delete(`http://192.168.1.24:3000/api/deleteTripPhoto/${trip._id}/${modalImage.file_name}`).then(res => {
                  
                  if (res.data == "File deleted"){
                    setImages(images.filter((image: any) => image.file_name != modalImage.file_name));
                    setisModalOpen(false);
                  }
                  else {
                    console.log("Error deleting file")
                  }
                  
                }
                )
              }}>
                Delete
              </Button>
            )}
            <Text>
            Added by {modalImage?.author.first_name} {modalImage?.author.last_name}
            </Text>
            </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  </Flex>
  )
}

export default PhotosGrid