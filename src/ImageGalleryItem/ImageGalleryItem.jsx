import Modal from 'react-modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled'
import { Component } from 'react';

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

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
    }

    handleCloseModal = () => {
        this.setState({ isModalOpen: false })
    }

    handleOpenModal = () => {
        this.setState({ isModalOpen: true })
    }

    render() {
        const { isModalOpen } = this.state;
        const { image } = this.props;
        return (<GalleryItem>
            <Image src={image.webformatURL} alt={image.tags} onClick={this.handleOpenModal} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={this.handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <img src={image.largeImageURL} alt={image.tags} />
            </Modal>
        </GalleryItem>)
    }
}


