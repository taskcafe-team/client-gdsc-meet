interface ImportMeta {
    env: Env;
}

interface Env {
    PORT:                       number;
    IO_PORT:                    number;
    LOCAL_ADDRESS:              string;
    LOCAL_HOST:                 string;
    IPV4_ADDRESS:               string;
    IPV4_HOST:                  string;
    IO_HOST:                    string;
    ROUTER_BASE_PATH:           string;
    STYLE_COLOR_DARK:           string;
    STYLE_COLOR_YELLOW:         string;
    STYLE_COLOR_BLUE:           string;
    STYLE_COLOR_WHITE:          string;
    API_ACCESS_TOKEN_HEADER:    string;
    API_KEY_STORE_ACCESS_TOKEN: string;
    API_MEETING_TOKEN_HEADER:   string;
    API_LOGIN_GOOGLE_URL:       string;
    API_WEBRTC_SOCKET_URL:      string;
    API_BASE_URL:               string;
}
