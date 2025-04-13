
import { toast } from "sonner";

const API_ENDPOINT = "https://api.runware.ai/v1";

export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  width?: number;
  height?: number;
  numberResults?: number;
  outputFormat?: string;
}

export class RunwareService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(params: GenerateImageParams): Promise<{ imageURL: string }> {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          { taskType: "authentication", apiKey: this.apiKey },
          {
            taskType: "imageInference",
            taskUUID: crypto.randomUUID(),
            model: params.model || "runware:100@1",
            positivePrompt: params.positivePrompt,
            width: params.width || 1024,
            height: params.height || 1024,
            numberResults: params.numberResults || 1,
            outputFormat: params.outputFormat || "WEBP",
            CFGScale: 1,
            scheduler: "FlowMatchEulerDiscreteScheduler",
          }
        ])
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        console.error("Image generation API error:", data.errors);
        throw new Error(data.errors[0].message || "Image generation failed");
      }

      if (data.data && data.data.length > 0) {
        const imageData = data.data.find((item: any) => item.taskType === "imageInference");
        if (imageData && imageData.imageURL) {
          return { imageURL: imageData.imageURL };
        }
      }

      throw new Error("No image URL found in response");
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("이미지 생성에 실패했습니다. 기본 이미지를 사용합니다.");
      throw error;
    }
  }
}
