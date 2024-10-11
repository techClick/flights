/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from '../PDFFile/PDFFile';
import { useAppSelector } from '../../../../redux/hooks';
import { selectPDFFileSrc } from '../../../../redux/store';

const PDFDownloadButton = function PDFDownloadButton() {
  const PDFFileSrc = useAppSelector<any>(selectPDFFileSrc);

  return (
    <>
      { PDFFileSrc && (
        <PDFDownloadLink document={<PDFFile imageSrc={PDFFileSrc} />} fileName="report001">
          {({ loading }) => loading
            ? <button type="button">Loading...</button>
            : <button type="button">Download</button> }
        </PDFDownloadLink>
      )}
    </>
  );
};

export default PDFDownloadButton;
