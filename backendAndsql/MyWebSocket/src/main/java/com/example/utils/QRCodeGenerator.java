package com.example.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class QRCodeGenerator {

    public static final String QR_CODE_IMAGE_PATH = "C:\\Users\\Computer\\Desktop\\springboot\\MyWebSocket\\img\\QRcode";

    public static String generateQRCodeImage(String text, int width, int height, String fileName)  {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

            String qrcodePath = QR_CODE_IMAGE_PATH+"\\"+fileName+".png";

            Path path = FileSystems.getDefault().getPath(qrcodePath);

            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

            return qrcodePath;
        } catch (WriterException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
