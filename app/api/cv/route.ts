import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define the path for the CV file
const cvFilePath = path.join(process.cwd(), "public", "IdrissaMaigaCV.pdf");

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("cv") as File;
    const code = formData.get("code") as string;

    // Validate the code
    const validCode = process.env.CV_UPLOAD_CODE;
    if (!code || code !== validCode) {
      return NextResponse.json(
        { error: "Invalid or missing upload code" },
        { status: 401 }
      );
    }

    // Validate the file
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer and save it as IdrissaMaigaCV.pdf
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(cvFilePath, buffer);

    // Return a success response
    return NextResponse.json({
      message: "CV uploaded successfully",
      filePath: "/IdrissaMaigaCV.pdf",
    });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return NextResponse.json(
      { error: "Failed to upload CV" },
      { status: 500 }
    );
  }
}