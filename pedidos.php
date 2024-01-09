<?php include_once 'produto.php';

$produto = new Produto();

$salgadoJson = array();
$pastelJson = array();
$lancheJson = array();
$bebidaJson = array();
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aba de pedidos</title>
    <link rel="stylesheet" href="css/carrinho.css">
</head>

<body>
    <div class="models">
        <div class="salgados-key" data-key="s">
            <div class="produtos-item">
                <a href="">
                    <div class="produto-item-img"><img src="" /></div>
                    <div class="produto-item-add">+</div>
                </a>
                <br>
                <div class="produto-item-price">R$</div>
                <div class="produto-item-name">--</div>
                <div class="produto-item-desc">--</div>
            </div>
        </div>

        <div class="cart-produtos" data-key="CART">
            <img src="" />
            <div class="cart-produto-name">--</div>
            <div class="cart-produto-area">
                <button class="cart-produto-qtmenos">-</button>
                <div class="cart-produto-qt">1</div>
                <button class="cart-produto-qtmais">+</button>
            </div>
        </div>
    </div>

    <!--menu-openner mobile-->
    <header>
        <h1>Pastel do Zé Rato</h1>
        <div class="menu-openner"><span>0</span>🛒</div>
    </header>
    <!--/menu-openner mobile-->

    <!--Conteúdo Principal-->
    <main>
        <!--Size Salgados-->
        <h2>Salgados</h2>
        <div class="salgado-area">
            <?php
            $resultado = $produto->buscar();
            while ($row = $resultado->fetch_assoc()) {
                $salgadoJson[] = array(
                    'nome' => $row['name'],
                    'img' => $row['img'],
                    'price' => $row['price'],
                    'description' => $row['description'],
                    'tipo' => $row['tipo']
                );
                
                if ($row['tipo'] == 'salgado') {

            ?>
                    <div class="salgado-area-produto1">
                        <div class="produtos-item-pasteis" data-key="<?= $row["tipo"] == 'salgado'?>">
                            <a href="">
                                <div class="produto-item-pastel-img"><img src="<?= $row['img'] ?>"></div>
                                <div class="produto-item-pastel-add">+</div>
                            </a>
                            <br>
                            <div class="produto-item-pastel-price">R$ <?= $row['price'] ?></div>
                            <div class="produto-item-pastel-name"><?= $row['name'] ?></div>
                            <div class="produto-item-pastel-desc"><?= $row['description'] ?></div>
                        </div>
                    </div>  
            <?php }
            } ?>
        </div>
        <!--/Size Salgados-->
        
        <!--Size Pasteis-->
        <h3>Pastéis</h3>
        <div class="pastel-area">
            <?php
            $resultado = $produto->buscar();
            while ($row = $resultado->fetch_assoc()) {
                $pastelJson[] = array(
                    'nome' => $row['name'],
                    'img' => $row['img'],
                    'price' => $row['price'],
                    'description' => $row['description'],
                    'tipo' => $row['tipo']
                );

                if ($row['tipo'] == 'pastel') {
            ?>
                    <div class="produtos-item-pasteis" data-key="<?= $row["tipo"] == 'pastel' ?>;">
                        <a href="">
                            <div class="produto-item-pastel-img"><img src="<?= $row['img'] ?>"></div>
                            <div class="produto-item-pastel-add">+</div>
                        </a>
                        <br>
                        <div class="produto-item-pastel-price">R$ <?= $row['price'] ?></div>
                        <div class="produto-item-pastel-name"><?= $row['name'] ?></div>
                        <div class="produto-item-pastel-desc"><?= $row['description'] ?></div>
                    </div>

                <?php }
            } ?>
        </div>
        <!--/Size Pasteis-->
        
        <!--Size Lanches-->
        <h4>Lanches</h4>
        <div class="lanche-area">
            <?php
                $resultado = $produto->buscar();
                while($row = $resultado->fetch_assoc()){
                    if($row['tipo'] == 'lanche') {
                ?>
                <div class="laches-key" data-key="<?= $row["tipo"] == 'lanche' ?>;">
                    <div class="produtos-item-lanches">
                        <a href="">
                        <div class="produto-item-lanche-img"><img src="<?= $row['img']; ?>;" /></div>
                        <div class="produto-item-lanche-add">+</div>
                        </a>
                        <br>
                        <div class="produto-item-lanche-price">R$<?= $row['price'] ?></div>
                        <div class="produto-item-lanche-name"><?= $row['name']; ?></div>
                        <div class="produto-item-lanche-desc"><?= $row['description']; ?></div>
                    </div>
                </div>
        <?php }
        } ?>
        </div>
        <!--/Size Lanches-->

        <!--Size Bebidas-->
        <h4>Bebidas</h4>
        <div class="bebida-area">
            <?php
            $resultado = $produto->buscar();
            while ($row = $resultado->fetch_assoc()) {
                if($row['tipo'] == 'bebida') {
            ?>
                    <div class="produtos-item-bebidas" data-key="<?= $row["tipo"] == 'bebida' ?>;">
                        <a href="">
                            <div class="produto-item-bebida-img"><img src="<?= $row['img'] ?>"></div>
                            <div class="produto-item-bebida-add">+</div>
                        </a>
                        <div class="produto-item-bebida-price"><?= $row['price'] ?></div>
                        <div class="produto-item-bebida-name"><?= $row['name'] ?></div>
                        <div class="produto-item-bebida-desc"><?= $row['description'] ?></div>
                    </div>

            <?php }
            } ?> 
           
        </div>
        <!--/Size Bebidas-->

        </div>
    </main>
    <!--/Conteúdo Principal-->

    <!-- aside do carrinho -->
    <aside>
        <div class="cart--area">
            <div class="menu-closer">❌</div>
            <h1>Seu Pedido</h1>
            <div class="cart"></div>
            <div class="cart--details">
                <div class="cart--totalitem subtotal">
                    <span>Subtotal</span>
                    <span>R$ --</span>
                </div>
                <div class="cart--totalitem total">
                    <span>Total</span>
                    <span>R$ --</span>
                </div>
                <div class="cart--finalizar">Finalizar o pedido</div>
            </div>
        </div>
    </aside>
    <!-- /aside do carrinho -->

    <!-- janela modal .salgadoWindowArea -->
    <div class="salgadoWindowArea">
        <div class="salgadoWindowBody">
            <div class="salgadoInfo--cancelMobileButton">Voltar</div>
            <div class="salgadoBig">
                <img src="" />
            </div>
            <div class="salgadosInfo">
                <div class="salgadoInfo--nome"></div>
                <div class="salgadoInfo--img"><img src="" /></div>
                <div class="salgadoInfo--desc">--</div>
                <div class="salgadoInfo--tipo"></div>
                <div class="salgadosInfo-sabores">
                    <div data-key="RC" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="RP" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="RF" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="CC" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="CF" class="salgadosInfo-sabores"><span></span></div>
                </div>

                <div class="salgadoInfo--pricearea">
                    <div class="salgadoInfo--sector">Preço</div>
                    <div class="salgadoInfo--price">
                        <div class="salgadoInfo--actualPrice">R$ --</div>
                        <div class="salgadoInfo--qtarea">
                            <button class="salgadoInfo--qtmenos">-</button>
                            <div class="salgadoInfo--qt">1</div>
                            <button class="salgadoInfo--qtmais">+</button>
                        </div>
                    </div>
                </div>
                <div class="salgadoInfo--addButton">Adicionar ao carrinho</div>
                <div class="salgadoInfo--cancelButton">Cancelar</div>
            </div>
        </div>
    </div>
    <!-- /janela modal .salgadoWindowArea -->

    <!--Modelos de pastéis fritos-->
    <div class="models">
        <div class="pasteis-key" data-key="s">
            <div class="produtos-item-pasteis">
                <a href="">
                    <div class="produto-item-pastel-img"><img src="" /></div>
                    <div class="produto-item-pastel-add">+</div>
                </a>
                <br>
                <div class="produto-item-pastel-price">R$</div>
                <div class="produto-item-pastel-name">--</div>
                <div class="produto-item-pastel-desc">--</div>
            </div>
        </div>
    </div>
    <!--/Modelos de pastéis Fritos-->

    <!--Janela modal pastéisWindowArea-->
    <div class="pastelWindowArea">
        <div class="pastelWindowBody">
            <div class="pastelInfo--cancelMobileButton">Voltar</div>
            <div class="pastelBig">
                <img src="" />
            </div>
            <div class="pasteisInfo">
                <h1>--</h1>
                <div class="pastelInfo--img"><img src="" /></div>
                <div class="pastelInfo--desc">--</div>
                <div class="pastelInfo-sabores">
                    <div data-key="PC" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="PP" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="PF" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="PCCQ" class="salgadosInfo-sabores"><span></span></div>
                    <div data-key="PCCM" class="salgadosInfo-sabores"><span></span></div>
                </div>

                <div class="pastelInfo--pricearea">
                    <div class="pastelInfo--sector">Preço</div>
                    <div class="pastelInfo--price">
                        <div class="pastelInfo--actualPrice">R$ --</div>
                        <div class="pastelInfo--qtarea">
                            <button class="pastelInfo--qtmenos">-</button>
                            <div class="pastelInfo--qt">1</div>
                            <button class="pastelInfo--qtmais">+</button>
                        </div>
                    </div>
                </div>
                <div class="pastelInfo--addButton">Adicionar ao carrinho</div>
                <div class="pastelInfo--cancelButton">Cancelar</div>
            </div>
        </div>
    </div>
    <!--/Janela modal pastéisWindowArea-->

    <!--Models lanches-->
    <div class="models">
        <div class="pasteis-key" data-key="s">
            <div class="produtos-item-lanches">
                <a href="">
                    <div class="produto-item-lanche-img"><img src="" /></div>
                    <div class="produto-item-lanche-add">+</div>
                </a>
                <br>
                <div class="produto-item-lanche-price">R$</div>
                <div class="produto-item-lanche-name">--</div>
                <div class="produto-item-lanche-desc">--</div>
            </div>
        </div>

        <div class="cart-produtos" data-key="CART">
            <img src="" />
            <div class="cart-produto-name">--</div>
            <div class="cart-produto-area">
                <button class="cart-produto-qtmenos">-</button>
                <div class="cart-produto-qt">1</div>
                <button class="cart-produto-qtmais">+</button>
            </div>
        </div>
    </div>
    <!--/Models lanches-->

    <!--Modal lanches-->
    <div class="lancheWindowArea">
        <div class="lancheWindowBody">
            <div class="lancheInfo--cancelMobileButton">Voltar</div>
            <div class="lancheBig">
                <img src="" />
            </div>
            <div class="lanchesInfo">
                <h1>--</h1>
                <div class="lancheInfo--img"><img src="" /></div>
                <div class="lancheInfo--desc">--</div>
                <div class="lancheInfo-sabores"></div>

                <div class="lancheInfo--pricearea">
                    <div class="lancheInfo--sector">Preço</div>
                    <div class="lancheInfo--price">
                        <div class="lancheInfo--actualPrice">R$ --</div>
                        <div class="lancheInfo--qtarea">
                            <button class="lancheInfo--qtmenos">-</button>
                            <div class="lancheInfo--qt">1</div>
                            <button class="lancheInfo--qtmais">+</button>
                        </div>
                    </div>
                </div>
                <div class="lancheInfo--addButton">Adicionar ao carrinho</div>
                <div class="lancheInfo--cancelButton">Cancelar</div>
            </div>
        </div>
    </div>
    <!--/Modal lanches-->

    <!--Modelos de bebidas-->
    <div class="models">
        <div class="bebidas-key" data-key="s">
            <div class="produtos-item">
                <a href="">
                    <div class="produto-item-bebida-img"><img src="" /></div>
                    <div class="produto-item-bebida-add">+</div>
                </a>
                <br>
                <div class="produto-item-bebida-price">R$</div>
                <div class="produto-item-bebida-name">--</div>
                <div class="produto-item-bebida-desc">--</div>
            </div>
        </div>

        <div class="cart-produtos" data-key="CART">
            <img src="" />
            <div class="cart-produto-name">--</div>
            <div class="cart-produto-area">
                <button class="cart-produto-qtmenos">-</button>
                <div class="cart-produto-qt">1</div>
                <button class="cart-produto-qtmais">+</button>
            </div>
        </div>
    </div>
    <!--/Modelos de bebidas-->

    <!--Modal bebidas-->
    <div class="bebidaWindowArea">
        <div class="bebidaWindowBody">
            <div class="bebidaInfo--cancelMobileButton">Voltar</div>
            <div class="bebidaBig">
                <img src="" />
            </div>
            <div class="bebidasInfo">
                <h1>--</h1>
                <div class="bebidaInfo--img"><img src="" /></div>
                <div class="bebidaInfo--desc">--</div>
                <div class="bebidaInfo-sabores"></div>

                <div class="bebidaInfo--pricearea">
                    <div class="bebidaInfo--sector">Preço</div>
                    <div class="bebidaInfo--price">
                        <div class="bebidaInfo--actualPrice">R$ --</div>
                        <div class="bebidaInfo--qtarea">
                            <button class="bebidaInfo--qtmenos">-</button>
                            <div class="bebidaInfo--qt">1</div>
                            <button class="bebidaInfo--qtmais">+</button>
                        </div>
                    </div>
                </div>
                <div class="bebidaInfo--addButton">Adicionar ao carrinho</div>
                <div class="bebidaInfo--cancelButton">Cancelar</div>
            </div>
        </div>
    </div>
    <!--/Modal bebidas-->

    <script>
        let foodJson = <?php echo json_encode($salgadoJson); ?>;
        let pastel = <?php echo json_encode($pastelJson); ?>;
    </script>

    <script src="js/salgados.js"></script>
</body>

</html>