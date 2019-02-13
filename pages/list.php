<div style="float: left;">
    <table class="table table-striped table-bordered table-hover table-sm table-responsive">
        <thead class="thead-dark">
            <tr >
                <th>Vārds</th>
                <th>Uzvārds</th>
                <th>Punkti</th>
                <th>Dzēst</th>
            </tr>
        </thead>
       <tbody>
            <tr>
                <?php
                    foreach ($people as $person) {
                        echo "<tr personId='".$person['id']."'>";
                        echo "<td name='name'>".$person['name']."</td>";
                        echo "<td name='surnmae'>".$person['surname']."</td>";
                        echo "<td name='points'>0</td>";
                        echo "<td name='delete'><button name='delete' class='btn-danger'>-</button></td>";
                        echo "</tr>";
                    }
                ?>
            </tr>
        </tbody>
    </table>
</div>