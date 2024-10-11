import React from 'react';
import {
  Page, Text, Image, Document, StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  pageNumber: {
    color: 'grey',
  },
  image: {
    height: '200px',
    width: '300px',
  },
});

const PDFFile = function PDFFile({ imageSrc }:{ imageSrc: any }) {
  return (
    <Document>
      <Page>
        <Text>READY</Text>
        <Image src={imageSrc} style={styles.image} />
        <Text>AFTER IMAGE</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};

export default PDFFile;
