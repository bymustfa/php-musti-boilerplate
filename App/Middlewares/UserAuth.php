<?phpnamespace App\Middlewares;class UserAuth{    public function handle()    {        if (auth()->get('login_user') && auth()->get('user_id')) {            return true;        } else {            return false;        }    }    public function NoLogin()    {        if (!auth()->get('user_login') && !auth()->get('user_id')) {            return true;        }        return false;    }}?>