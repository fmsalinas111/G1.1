<nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
<?php
    function subMenu(string $tit = "", string $ops = ""): string {
        return '  <details class="group [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer select-none">
                        <div class="flex items-center">
                            <i class="fa-solid fa-database w-6"></i>
                            <span>  ' . $tit . ' </span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-open:rotate-180"></i>
                    </summary>     <!-- Sub-opciones -->
                    <div class="pl-10 pr-2 py-2 space-y-1 bg-slate-950/40 rounded-b-lg mt-1">
                        ' . $ops . '
                    </div>
                </details>';
    }

    function createNav(array $data): string {
        $b = ""; $clase = 'class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition"';
                $claseSub= 'class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition"';
        foreach ($data as $d) {
            $_view = ($d['view']==='_tienda')? $_SESSION['page']:$d['view'];
            if ($_view === "group") {  $ops = "";
                foreach ($d['options'] as $o) {
                    $ops .= '<a href="' . $o['view'] . '" onclick="setLS(\'dttp\', ' . $o['id'] . ')" '.$claseSub.'>' . $o['text'] . '</a>';
                }
                $b .= subMenu($d['text'], $ops);
            } else {
                $b .= '<a href="' . $_view .'"'. $clase. ' >
                            <i class="' . $d['icon'] .' w-5"></i>'. $d['text'] . '
                        </a>';
            }
        }        
        return $b;
    }        
    echo createNav(json_decode($_SESSION['menuApp'], true));    
?>        
</nav>
