import type { Schema, Struct } from '@strapi/strapi';

export interface ImagesEventImages extends Struct.ComponentSchema {
  collectionName: 'components_images_event_images';
  info: {
    displayName: 'eventImages';
  };
  attributes: {
    imagesUrl1: Schema.Attribute.String;
    imagesUrl2: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'images.event-images': ImagesEventImages;
    }
  }
}
