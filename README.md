# hcm_components

Свободные компоненты для WebSoftHCM

### component_startup_cache

Данный компонент позволяет кэшировать библиотеки до старта приложения.
Что спасает от ошибок, когда не определенна переменная или функция при массовом вызове OpenCodeLib, так 
как компонент инициализируется до старта сервера.

Компонент необходимо разместить в директории с компонентами serverDirectory/components/

В файле конфигурации xHttp.ini указать директории и/или файлы через запятую с кодом который вызывается через OpenCodeLib 

Пример:
COMPONET-STARTUP-CACHE-DIR-URL:x-local://wtv/libs, x-local://wtv/wtv_file_source_file_system.js


Информация о кэшировании записывается в лог component_startup_cache.
