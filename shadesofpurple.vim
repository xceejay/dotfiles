function! crystalline#theme#shadesofpurple#set_theme() abort
  call crystalline#generate_theme({
        \ 'NormalMode':  [[255, 232], ['#EEEEEE', '#1C1C1C']],
        \ 'InsertMode':  [[255, 196],  ['#1C1C1C', '#00FF00']],
        \ 'VisualMode':  [[232, 177], ['#1C1C1C', '#c991ff']],
        \ 'ReplaceMode': [[232, 204], ['#1C1C1C', '#FF628C']],
        \ '':            [[232, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'Inactive':    [[232, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'Fill':        [[255, 232], ['#EEEEEE', '#1C1C1C']],
        \ 'Tab':         [[232, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'TabType':     [[232, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'TabSel':      [[232, 226], ['#1C1C1C', '#FAD000']],
        \ 'TabFill':     [[255, 232], ['#EEEEEE', '#1C1C1C']],
        \ })
endfunction

" vim:set et sw=2 ts=2 fdm=marker:

