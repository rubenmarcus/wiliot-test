export type AppData = {
  temperature: number;
  id: number;
  timestamp: number;
};

export interface WebSocketData extends AppData {
  data: number;
}

export type FormatedAppData = {
  timestamp: string;
  p1Temperature: number;
  p2Temperature: number;
  id: number;
};

export type MappedAppData = {
  timestamp: string;
  p1Temperature: number[];
  p2Temperature: number[];
  id: number;
};

export type RealData = {
  data: FormatedAppData[];
};

export type ProductData = {
  temp: number[];
  time: string;
};
