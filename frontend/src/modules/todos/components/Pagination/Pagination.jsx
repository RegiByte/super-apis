
const Pagination = ({page, setPage, current_page, next_page_url}) => {

  return (
    <div className={"flex justify-center space-between items-center gap-5"}>
      {current_page === 1 ? (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red-300 border-red-300 hover:bg-red-400"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Pagina anterior
        </button>
      ) : (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-green hover:bg-teal-400"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Pagina anterior
        </button>
      )}
      Pagina atual : {page}
      {next_page_url === null ? (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red-300 border-red-300 hover:bg-red-400"
          onClick={() => setPage((old) => old + 1)}
          disabled={next_page_url === null}
        >
          Proxima pagina
        </button>
      ) : (
        <button
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-green hover:bg-teal-400"
          onClick={() => setPage((old) => old + 1)}
          disabled={next_page_url === null}
        >
          Proxima pagina
        </button>
      )}
    </div>
  );
};

export default Pagination;