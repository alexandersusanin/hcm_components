function logger(msg)
{
        LogEvent('component_startup_cache', msg);
}

function cacheDirectoryApi(rootUrl){
        try {
                var result = [];
                var apisArr = [];

                function readJsDirectoryRec(dirUrl) {
                        entries = ReadDirectory(dirUrl);
                        children = [];

                        for (entry in entries) {
                                if (IsDirectory(entry)) {
                                        sub = readJsDirectoryRec(entry);
                                        if (!IsEmptyValue(sub)) {
                                                children.push({
                                                        id: RValue(Random(1, 10000000)),
                                                        name: FileName(UrlToFilePath(entry)),
                                                        type: 'directory',
                                                        children: sub
                                                });
                                        }
                                } else if (UrlPathSuffix(entry) == '.js') {
                                        children.push({
                                                id: RValue(Random(1, 10000000)),
                                                name: FileName(UrlToFilePath(entry)),
                                                type: 'file',
                                        });
                                        apisArr.push({ name: entry });
                                }
                        }
                        return ArraySort(children, 'type', '+', 'name', '+');
                }
                var jsTree = readJsDirectoryRec(rootUrl);

                if (!IsEmptyValue(jsTree)) {
                        result.push({
                                id: RValue(Random(1, 10000000)),
                                type: 'directory',
                                name: FileName(UrlToFilePath(rootUrl)),
                                children: jsTree
                        });
                }

                for (api in apisArr) {
                        try {
                                OpenCodeLib(api.name);
                                logger('cache code \t' + api.name);
                        } catch (ex) {
                                logger(ex);
                        }
                }
        } catch (ex) {
                logger(ex);
        }
        return true;
}

function cacheApi(url)
{
       try{
               OpenCodeLib(url);
               logger('cache code \t' + url);
       }
       catch (ex)
       {
               logger(ex);
       }
}

function init()
{
        try
        {
                alert( '!!!!Component startup initializing...' );
                EnableLog('component_startup_cache');
                tools_component.init_main( component_startup_cache.component_base_path);
                for(e in AppServerConfig.GetOptProperty('СOMPONET-STARTUP-CACHE-DIR-URL').split(",") )
                {
                        if (e != "")
                        {
                                if(IsDirectory(e))
                                {
                                        cacheDirectoryApi(e);
                                }
                                else {
                                        cacheApi(e);
                                }
                        }
                }
                alert( '!!!!!Component startup initialized' );
        }
        catch ( g_err )
        {
                alert( 'ERROR: Component initializing: startup :\r\n' + g_err );
                throw g_err;
        }
}

function append_component_relative_url( sUrlParam )
{
        UrlAppendPath( component_startup_cache.component_base_path, sUrlParam );
}
