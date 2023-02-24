import Language from "../enums/Language";
import MimeType from "../enums/MimeType";

interface CreateOrder {
  language: Language;
  mimeType: MimeType;
  count: number;
}

export default CreateOrder;
