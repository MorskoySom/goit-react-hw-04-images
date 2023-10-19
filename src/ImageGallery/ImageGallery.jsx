import { GalleryView } from './ImageGallery.styled'
import { ImageGalleryItem } from 'ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images }) => {
    return (
        <GalleryView>{images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />
        })}
        </GalleryView>)
}
