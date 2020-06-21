"Sets numbering
set  number relativenumber

"Enable Syntax highlighting
syntax enable

" Sets how many lines of history VIM has to remember
set history=1000

" Enable filetype plugins
filetype plugin on
filetype indent on

"Ignore case when searching 
set ignorecase

" Makes search act like search in modern browsers
set incsearch

" No backup
set nobackup
set nowb

"no swap file
set noswapfile

" For regex
set magic

"makes mouse be able to highlight
set mouse=a

"Remap Vim 0 to first non-blank character
map 0 ^

" Don't redraw while executing macros (good performance config)
set lazyredraw 

" No annoying sound on errors
set noerrorbells
set novisualbell
set t_vb=
set tm=500


"set cursor movement on page down and up
set so=7

" Better tab completion
set wildmenu

" Set to auto read when a file is changed from the outside
set autoread

"markdown specific
autocmd FileType markdown inoremap * **<left>

" A buffer becomes hidden when it is abandoned
set hid

" Configure backspace so it acts as it should act
set backspace=eol,start,indent
set whichwrap+=<,>,h,l


" Show matching brackets when text indicator is over them
set showmatch 

" How many tenths of a second to blink when matching brackets
set mat=2

" Set utf8 as standard encoding and en_US as the standard language
set encoding=utf8


" Use Unix as the standard file type
set ffs=unix,dos,mac

" Use spaces instead of tabs
set expandtab

" Be smart when using tabs ;)
set smarttab

" 1 tab == 4 spaces
set shiftwidth=4
set tabstop=4

" Linebreak on 500 characters
set lbr
set tw=500

set ai "Auto indent
set si "Smart indent
set wrap "Wrap lines
set smarttab
set cindent
set tabstop=2
set shiftwidth=2
" always uses spaces instead of tab characters
set expandtab

" copy and pastinggggggggggggggggggggggg
set clipboard+=unnamedplus

"find and replace pattern highlight
set inccommand=nosplit


"Change leader key
:let mapleader = ","


"remember where i last left off #cursor
if has("autocmd")
  au BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$")
        \| exe "normal! g'\"" | endif
endif




" Visual mode pressing * or # searches for the current selection
vnoremap <silent> * :<C-u>call VisualSelection('', '')<CR>/<C-R>=@/<CR><CR>
vnoremap <silent> # :<C-u>call VisualSelection('', '')<CR>?<C-R>=@/<CR><CR>

" Always show the status line
set laststatus=2

" Format the status line
set statusline=\ %{HasPaste()}%F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l\ \ Column:\ %c



"shows command being typed in normal mode
set showcmd



"Delete trailing white space on save, useful for some filetypes ;)
fun! CleanExtraSpaces()
  let save_cursor = getpos(".")
  let old_query = getreg('/')
  silent! %s/\s\+$//e
  call setpos('.', save_cursor)
  call setreg('/', old_query)
endfun

if has("autocmd")
  autocmd BufWritePre *.txt,*.js,*.py,*.wiki,*.sh,*.coffee :call CleanExtraSpaces()
endif

" Returns true if paste mode is enabled
function! HasPaste()
  if &paste
    return 'PASTE MODE  '
  endif
  return ''
endfunction





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" =>Vim plug
" """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('/home/joel/nvim/plugged')


"latex
Plug 'lervag/vimtex'

"nginx 
Plug 'chr4/nginx.vim'

"fish
Plug 'dag/vim-fish'

"terraform
Plug 'hashivim/vim-terraform'
Plug 'juliosueiras/vim-terraform-completion'

"Show vim buffers
Plug 'pacha/vem-tabline'

" Plugin outside ~/.vim/plugged with post-update hook
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }

"coc for vscode inspired emulation
Plug 'neoclide/coc.nvim', {'branch': 'release'}

"autoclosing tags
Plug 'townk/vim-autoclose'

"airline
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

"devicon
Plug 'ryanoasis/vim-devicons'

"Nerdtree
Plug 'scrooloose/nerdtree'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'scrooloose/nerdcommenter'
Plug 'Xuyuanp/nerdtree-git-plugin'

"Clang
Plug 'rip-rip/clang_complete'

"goyo
Plug 'junegunn/goyo.vim'

"golang
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }

"floating terminal
Plug 'voldikss/vim-floaterm'

"tables in vim
Plug 'dhruvasagar/vim-table-mode'

"Git
Plug 'tpope/vim-fugitive'

"Colors
Plug 'ap/vim-css-color'

"snippets
Plug 'honza/vim-snippets'


"notes
"Plug 'vimwiki/vimwiki'

"org mode
"Plug 'jceb/vim-orgmode'


"temp js
Plug 'pangloss/vim-javascript'
"Plug 'mxw/vim-jsx'
"Plug 'leafgarland/typescript-vim'
"Plug 'peitalin/vim-jsx-typescript'
"Plug 'styled-components/vim-styled-components', { 'branch': 'main' }
"Plug 'jparise/vim-graphql'


call plug#end()


" path to directory where library can be found
let g:clang_library_path='/usr/lib/llvm-10/lib'

"Pathogen
execute pathogen#infect() 





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""%%%%CODE EMULATION%%%""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


inoremap jk <ESC>
nmap <C-n> :NERDTreeToggle<CR>
vmap ++ <plug>NERDCommenterToggle
nmap ++ <plug>NERDCommenterToggle

let g:NERDTreeIgnore = ['^node_modules$']
let g:NERDTreeQuitOnOpen = 1
let g:NERDTreeGlyphReadOnly = "RO"
" vim-prettier
let g:prettier#quickfix_enabled = 1
let g:prettier#quickfix_auto_focus = 0
" prettier command for coc
command! -nargs=0 Prettier :CocCommand prettier.formatFile
" run prettier on save
let g:prettier#autoformat = 1

autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue,*.yaml,*.html Prettier

" ctrlp
let g:ctrlp_user_command = ['.git/', 'git --git-dir=%s/.git ls-files -oc --exclude-standard']

" j/k will move virtual lines (lines that wrap)
noremap <silent> <expr> j (v:count == 0 ? 'gj' : 'j')
noremap <silent> <expr> k (v:count == 0 ? 'gk' : 'k')
set guifont=Iosevka\ Term\ Medium\ 11
let g:airline_powerline_fonts = 1


" sync open file with NERDTree
" " Check if NERDTree is open or active
function! IsNERDTreeOpen()        
  return exists("t:NERDTreeBufName") && (bufwinnr(t:NERDTreeBufName) != -1)
endfunction

" Call NERDTreeFind iff NERDTree is active, current window contains a modifiable
" file, and we're not in vimdiff
function! SyncTree()
  if &modifiable && IsNERDTreeOpen() && strlen(expand('%')) > 0 && !&diff
    NERDTreeFind
    wincmd p
  endif
endfunction

" Highlight currently open buffer in NERDTree ("makes nerd tree open twice")
"autocmd BufEnter * call SyncTree()

" coc config
let g:coc_global_extensions = [
      \ 'coc-snippets',
      \ 'coc-fish',
      \ 'coc-html',
      \ 'coc-lua',
      \ 'coc-python',
      \ 'coc-docker',
      \ 'coc-vimtex',
      \'coc-tsserver',
      \ 'coc-yaml',
      \ 'coc-markdownlint',
      \ 'coc-emmet',
      \ 'coc-sh',
      \ 'coc-prettier', 
      \ 'coc-eslint', 
      \ 'coc-json', 
      \ ]

"  \ 'coc-pairs',
" from readme
" if hidden is not set, TextEdit might fail.
set hidden " Some servers have issues with backup files, see #649 set nobackup set nowritebackup " Better display for messages set cmdheight=2 " You will have bad experience for diagnostic messages when it's default 4000.
set updatetime=300

" don't give |ins-completion-menu| messages.
set shortmess+=c

" always show signcolumns
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate.
" Use command ':verbose imap <tab>' to make sure tab is not mapped by other plugin.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current position.
" Coc only does snippet and additional edit on confirm.
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
" Or use `complete_info` if your vim support it, like:
inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"

" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" Remap keys for gotos
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight symbol under cursor on CursorHold
autocmd CursorHold * silent call CocActionAsync('highlight')

" Remap for rename current word
nmap <F2> <Plug>(coc-rename)

" Remap for format selected region
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Remap for do codeAction of selected region, ex: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap for do codeAction of current line
nmap <leader>ac  <Plug>(coc-codeaction)
" Fix autofix problem of current line
nmap <leader>qf  <Plug>(coc-fix-current)

" Create mappings for function text object, requires document symbols feature of languageserver.
xmap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap if <Plug>(coc-funcobj-i)
omap af <Plug>(coc-funcobj-a)

" Use <C-d> for select selections ranges, needs server support, like: coc-tsserver, coc-python
nmap <silent> <C-d> <Plug>(coc-range-select)
xmap <silent> <C-d> <Plug>(coc-range-select)

" Use `:Format` to format current buffer
command! -nargs=0 Format :call CocAction('format')

" Use `:Fold` to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" use `:OR` for organize import of current buffer
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add status line support, for integration with other plugin, checkout `:h coc-status`
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Using CocList
" Show all diagnostics
nnoremap <silent> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions
nnoremap <silent> <space>e  :<C-u>CocList extensions<cr>
" Show commands
nnoremap <silent> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document
nnoremap <silent> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols
nnoremap <silent> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list
nnoremap <silent> <space>p  :<C-u>CocListResume<CR>




"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""%%PERSONAL CONFIG
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"autoadd skeleton text anytime i create a markdown file
autocmd BufNewFile *.md r ~/pandoc/mdskeltontxt | :norm ggddjwwl

"syntaxcheck
set statusline+=%#warningmsg#
"set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 0
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_aggregate_errors = 1

"emmet auto close tags etc key binding
let g:user_emmet_mode='n'
let g:user_emmet_leader_key=','


"autoadd skeleton text anytime i create a new java file 
"autocmd BufNewFile *.java r ~/pandoc/javaskeletontxt| :norm jjjww 

"autoadd skeleton text anytime i start an assignment in latex
autocmd BufNewFile \(*ass?.tex\|*ass.tex\) r ~/pandoc/latexassskeletontxt | :norm 35Gww "
let g:tex_flavor = 'latex'

"set Color scheme
colorscheme spacemacsvimdark

"floaterm
let g:floaterm_keymap_new    = '<F1>'
let g:floaterm_keymap_prev   = '<F2>'
let g:floaterm_keymap_next   = '<F3>'
let g:floaterm_keymap_toggle = '<F4>'


"go pls
let g:go_def_mode='gopls'
let g:go_info_mode='gopls'



"quickly enable / disable table mode in insert mode by using || or __ :
function! s:isAtStartOfLine(mapping)
  let text_before_cursor = getline('.')[0 : col('.')-1]
  let mapping_pattern = '\V' . escape(a:mapping, '\')
  let comment_pattern = '\V' . escape(substitute(&l:commentstring, '%s.*$', '', ''), '\')
  return (text_before_cursor =~? '^' . ('\v(' . comment_pattern . '\v)?') . '\s*\v' . mapping_pattern . '\v$')
endfunction

inoreabbrev <expr> <bar><bar>
      \ <SID>isAtStartOfLine('\|\|') ?
      \ '<c-o>:TableModeEnable<cr><bar><space><bar><left><left>' : '<bar><bar>'
inoreabbrev <expr> __
      \ <SID>isAtStartOfLine('__') ?
      \ '<c-o>:silent! TableModeDisable<cr>' : '__'



" this is handled by LanguageClient [LC]
let g:go_def_mapping_enabled = 0

"vim wiki 2 markdown
"let g:vimwiki_list = [{'path': '~/vimwiki/',
                      "\ 'syntax': 'markdown', 'ext': '.md'}]



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""%%%%KEY BINDINGS%%%""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

noremap <S-tab> :next<CR>

"Save file with Ctrl+s
noremap <C-s> :w!<CR>


"fuzzy finder to find file with ctrl+p in vim and open it
"noremap <c-p> :vsplit \| :FZF <CR>
noremap <C-p> :FZF <CR>

""auto compile pandoc on F9 key press
nnoremap <buffer><nowait><silent> <F9> :c-u><silent call system'(pandoc '.expand('%:p:S').' -o '.expand('%:p:r:S').'.pdf')<cr>
"auto compile latex on f10 press
nnoremap <buffer><nowait><silent> <F10> :<c-u>silent call system(pdflatex *.tex'') <cr>
"

""spell checking and correction
map<F6> :setlocal spell spelllang=en_gb
nmap<F5> [sz=
nmap<F7> ]>sz=

""make line, go to line, indent and return to marked line in insert mode
inoremap<c-I> <ESC>maG=gg`aa


"move between splits 
nmap <silent> <A-Up> :wincmd k<CR>
nmap <silent> <A-Down> :wincmd j<CR>
nmap <silent> <A-Left> :wincmd h<CR>
nmap <silent> <A-Right> :wincmd l<CR>

"toggle split 
nmap <silent> <C-\> :vsplit 

"move between buffer
nmap <c-i> <Plug>vem_prev_buffer-
nmap <c-o> <Plug>vem_next_buffer-

"This unsets the "last search pattern" register by hitting return
nnoremap <CR> :noh<CR><CR>





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"%%% THEMING %%""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

hi Normal     ctermbg=NONE guibg=NONE
hi LineNr     ctermbg=NONE ctermfg=NONE guibg=NONE ctermfg=red 
"hi CursorLineNr ctermfg=magenta ctermbg=NONE
hi CursorLineNr ctermfg=203 ctermbg=NONE
highlight clear SignColumn
"hi StatusLine ctermbg=232 ctermfg=140
"hi TabLineFill ctermfg=NONE ctermbg=NONE
"hi TabLine ctermfg=NONE ctermbg=NONE
"hi TabLineSel ctermfg=NONE ctermbg=NONE
hi FloatermNC guibg=skyblue
highlight VemTablineNormal           term=reverse cterm=none ctermfg=255   ctermbg=234 
highlight VemTablineLocation         term=reverse cterm=none ctermfg=239 ctermbg=251 
highlight VemTablineNumber           term=reverse cterm=none ctermfg=239 ctermbg=251 
highlight VemTablineSelected         term=bold    cterm=bold ctermfg=0   ctermbg=255 
highlight VemTablineLocationSelected term=bold    cterm=none ctermfg=239 ctermbg=255 
highlight VemTablineNumberSelected   term=bold    cterm=none ctermfg=239 ctermbg=255 
highlight VemTablineShown            term=reverse cterm=none ctermfg=0   ctermbg=251 
highlight VemTablineLocationShown    term=reverse cterm=none ctermfg=0   ctermbg=251 
highlight VemTablineNumberShown      term=reverse cterm=none ctermfg=0   ctermbg=251 
highlight VemTablineSeparator        term=reverse cterm=none ctermfg=246 ctermbg=251 
highlight VemTablinePartialName      term=reverse cterm=none ctermfg=246 ctermbg=251 
highlight VemTablineTabNormal        term=reverse cterm=none ctermfg=0   ctermbg=251 
highlight VemTablineTabSelected      term=bold    cterm=bold ctermfg=0   ctermbg=255 





