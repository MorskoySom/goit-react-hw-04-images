import Modal from 'react-modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled'
import { useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

export const ImageGalleryItem = ({ image }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    return (<GalleryItem>
        <Image src={image.webformatURL} alt={image.tags} onClick={handleOpenModal} />
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <img src={image.largeImageURL} alt={image.tags} />
        </Modal>
    </GalleryItem>)
}


