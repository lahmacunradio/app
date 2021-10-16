export interface Show {
  id: number;
  active: boolean;
  archive_lahmastore: boolean;
  archive_ahmastore_base_url: boolean;
  archive_mixcloud: boolean;
  archive_mixcloud_base_url: boolean;
  cover_image_url: string;
  day: number;
  description: string;
  end: string; // "HH:ii:SS"
  frequency: number;
  items: ShowItem[];
  language: string;
  name: string;
  playlist_name: string;
  start: string; // "HH:ii:SS"
  users: any[];
  week: number;
}

export interface ShowItem {
  archived: boolean;
  description: string;
  id: number;
  image_url: string;
  name: string;
  number: string;
  play_date: string; //YYYY-MM-DD
}

export interface Item {
  airing: boolean;
  archive_lahmastore: boolean;
  archive_ahmastore_canonical_url: boolean;
  archive_mixcloud: boolean;
  archive_mixcloud_canonical_url: boolean;
  broadcast: boolean;
  description: string;
  download_count: number;
  id: number;
  image_url: string;
  language: string;
  live: boolean;
  name: string;
  number: string;
  play_date: string; // YYYY-MM-DD
  play_file_name: string;
  shows: Pick<Show, 'id' | 'name'>[];
  uploader: string;
}
